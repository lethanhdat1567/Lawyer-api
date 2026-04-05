import { getSupabase } from "../lib/supabase.js";
import type { StreamTextResult } from "ai";
import { LawArticle } from "../types/crawl.js";
import aiService from "./ai.service.js";
import chatMessageService from "./chat-message.service.js";
import { LocalAiService } from "./localAi.service.js";
import aiConfigService from "./ai-config.service.js";

interface AskLawerAiOptions {
    sessionId?: string;
    userQuestion: string;
}

class ChatAIService {
    private supabase = getSupabase();

    async ask({ sessionId, userQuestion }: AskLawerAiOptions): Promise<StreamTextResult<any, any>> {
        // 1. Trích xuất số điều từ câu hỏi (Regex)
        const articleMatch = userQuestion.match(/Điều\s+(\d+)/i);
        const articleNumber = articleMatch ? articleMatch[1] : null;

        let contextArticles: any[] = [];

        // 2. Bước 1: Ưu tiên tìm kiếm CHÍNH XÁC số điều bằng Text Search
        if (articleNumber) {
            const { data: exactMatches } = await this.supabase
                .from("law_articles")
                .select("*")
                // Tìm tiêu đề bắt đầu bằng "Điều X." hoặc "Điều X:" hoặc "Điều X "
                .or(`article_title.ilike.Điều ${articleNumber}.%,article_title.ilike.Điều ${articleNumber} %`)
                .limit(2);

            if (exactMatches) contextArticles = [...exactMatches];
        }

        // 3. Bước 2: Tìm kiếm ngữ nghĩa bằng Vector (Bổ sung thêm ngữ cảnh)
        const queryVector = await LocalAiService.generate(userQuestion);
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
        console.log("contextArticles", contextArticles);

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

        // 5. System Prompt thông minh hơn
        const systemPrompt = `
            ${advisorPrompt}

            CHỈ THỊ XỬ LÝ DỮ LIỆU:
            - Nếu [NGUỒN DỮ LIỆU PHÁP LUẬT] có nội dung Điều/Khoản người dùng yêu cầu, hãy trích dẫn và giải thích từ đó.
            - Nếu [NGUỒN DỮ LIỆU PHÁP LUẬT] không có hoặc trả về nhầm Điều khác, hãy dùng kiến thức chuyên môn của bạn để trả lời Điều người dùng hỏi, nhưng phải ghi chú rõ là "Dựa trên kiến thức pháp luật hiện hành".
            - Ưu tiên sự chính xác về con số và mốc thời gian.

            NGUỒN DỮ LIỆU PHÁP LUẬT:
            ${contextString}

            CÂU HỎI CỦA NGƯỜI DÙNG:
            ${userQuestion}
        `;

        return aiService.generateStreamText(systemPrompt, {
            onFinish: async (text) => {
                if (sessionId) {
                    await chatMessageService.createMessage(sessionId, text, "assistant");
                }
            },
        });
    }

    async getTitle(message: string) {
        const result = await aiService.generateGoogleText(
            `Tóm tắt câu hỏi sau thành một tiêu đề ngắn gọn (dưới 6 từ): "${message}"`,
        );

        return result;
    }
}

export default new ChatAIService();
