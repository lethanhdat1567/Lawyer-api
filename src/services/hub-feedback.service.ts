import { getPrisma } from "../lib/prisma.js";
import aiConfigService from "./ai-config.service.js";
import { getSupabase } from "../lib/supabase.js";
import { embeddingService } from "./embedding.service.js";
import aiService from "./ai.service.js";

class HubFeedbackService {
    private supabase = getSupabase();

    async findPublicHubById(hubId: string) {
        const prisma = getPrisma();

        return await prisma.hubPost.findFirst({
            where: { id: hubId, status: "PUBLISHED" },
        });
    }

    async createFeedback(hubId: string, content?: string) {
        if (!content) return;
        const prisma = getPrisma();

        try {
            // 1. Vectorize nội dung vấn đề của người dùng
            const queryVector = await embeddingService.generate(content);

            // 2. Truy vấn các điều luật liên quan từ Database (RAG)
            // Lưu ý: Sử dụng cùng logic match_law_articles như hàm ask
            const { data: contextArticles } = await this.supabase.rpc("match_law_articles", {
                query_embedding: queryVector,
                match_threshold: 0.5, // Ngưỡng rộng hơn để bao quát vấn đề diễn đàn
                match_count: 10,
            });

            // 3. Xây dựng chuỗi ngữ cảnh luật pháp
            const contextString = contextArticles?.length
                ? contextArticles.map((article: any) => `📌 ${article.article_title}: ${article.content}`).join("\n\n")
                : "Không tìm thấy điều luật cụ thể trong kho dữ liệu.";

            const hubPrompt = await aiConfigService.getPromptByType("community");

            // 4. Cấu trúc Prompt tối ưu: Luật pháp lên đầu để tận dụng Caching
            const fullPrompt = `
                ${hubPrompt}

                DỮ LIỆU PHÁP LUẬT THAM KHẢO:
                ${contextString}

                VẤN ĐỀ CỦA NGƯỜI DÙNG TRÊN DIỄN ĐÀN:
                "${content}"

                YÊU CẦU:
                Dựa trên dữ liệu pháp luật trên, hãy đưa ra lời khuyên hữu ích, đồng cảm và đúng luật cho người dùng.
            `;

            const result = await aiService.generateText(fullPrompt);

            // 5. Lưu kết quả vào DB
            await prisma.hubFeedback.create({
                data: {
                    hubId,
                    rawResponse: result,
                    status: "COMPLETED",
                },
            });
        } catch (error) {
            console.error("Lỗi xử lý AI Feedback:", error);
            await prisma.hubFeedback.create({
                data: {
                    hubId,
                    status: "FAILED",
                },
            });
        }
    }
}

export default new HubFeedbackService();
