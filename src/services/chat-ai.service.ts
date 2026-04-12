import { getSupabase } from "../lib/supabase.js";
import type { StreamTextResult } from "ai";
import aiService from "./ai.service.js";
import chatMessageService from "./chat-message.service.js";
import aiConfigService from "./ai-config.service.js";
import { embeddingService } from "./embedding.service.js";
import { getPrisma } from "../lib/prisma.js";

interface AskLawerAiOptions {
    sessionId?: string;
    userQuestion: string;
}

class ChatAIService {
    private supabase = getSupabase();

    async ask({ sessionId, userQuestion }: AskLawerAiOptions): Promise<StreamTextResult<any, any>> {
        const prisma = getPrisma();
        // 1. Trích xuất số điều từ câu hỏi (Regex)
        const articleMatch = userQuestion.match(/Điều\s+(\d+)/i);
        const articleNumber = articleMatch ? articleMatch[1] : null;

        let contextArticles: any[] = [];

        // 2. Bước 1: Ưu tiên tìm kiếm CHÍNH XÁC số điều bằng Text Search
        if (articleNumber) {
            const { data: exactMatches } = await this.supabase
                .from("law_articles")
                .select("id, law_title, chapter, article_title, content")
                // Tìm tiêu đề bắt đầu bằng "Điều X." hoặc "Điều X:" hoặc "Điều X "
                .or(`article_title.ilike.Điều ${articleNumber}.%,article_title.ilike.Điều ${articleNumber} %`)
                .limit(2);

            if (exactMatches) contextArticles = [...exactMatches];
        }

        // 3. Bước 2: Tìm kiếm ngữ nghĩa bằng Vector (Bổ sung thêm ngữ cảnh)
        const queryVector = await embeddingService.generate(userQuestion);
        const { data: vectorResults, error } = await this.supabase.rpc("match_law_articles", {
            query_embedding: queryVector,
            match_threshold: 0.5,
            match_count: 8,
        });

        if (error) {
            console.error("Lỗi RPC Supabase:", error);
            throw new Error("Không thể truy xuất dữ liệu pháp luật.");
        }

        // Gộp kết quả: Giữ lại kết quả chính xác ở đầu, loại bỏ trùng lặp từ Vector
        const existingIds = new Set(contextArticles.map((a) => a.id));
        const uniqueVectorResults = (vectorResults || []).filter((a: any) => !existingIds.has(a.id));
        contextArticles = [...contextArticles, ...uniqueVectorResults].slice(0, 10);

        // 4. Xây dựng contextString sạch sẽ
        const contextString =
            contextArticles.length > 0
                ? contextArticles
                      .map(
                          (article, index) =>
                              `[Nguồn ${index + 1}]: ${article.law_title} - ${article.article_title}\nNội dung: ${article.content}`,
                      )
                      .join("\n\n---\n\n")
                : "KHÔNG TÌM THẤY VĂN BẢN GỐC TRONG CƠ SỞ DỮ LIỆU.";

        const advisorPrompt = await aiConfigService.getPromptByType("advisor");
        const modalSystem = await prisma.scheduleBlogSystem.findFirst({ select: { model: true } });

        // 5. System Prompt thông minh hơn
        const systemPrompt = `
            ${advisorPrompt}
            NGUỒN DỮ LIỆU PHÁP LUẬT:
            ${contextString}
            CÂU HỎI CỦA NGƯỜI DÙNG:
            ${userQuestion}
        `;

        const result = await aiService.generateStreamText(systemPrompt, modalSystem?.model, async (text: string) => {
            if (sessionId) {
                await chatMessageService.createMessage(sessionId, text, "assistant");
            }
        });

        return result;
    }

    async getTitle(message: string) {
        const result = await aiService.generateText(
            `Tóm tắt câu hỏi sau thành một tiêu đề ngắn gọn (dưới 6 từ): "${message}"`,
        );

        return result;
    }
}

export default new ChatAIService();
