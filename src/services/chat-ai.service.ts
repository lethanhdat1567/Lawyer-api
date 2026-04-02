import { getSupabase } from "../lib/supabase.js";
import type { StreamTextResult } from "ai";
import { LawArticle } from "../types/crawl.js";
import aiService from "./ai.service.js";
import chatMessageService from "./chat-message.service.js";

interface AskLawerAiOptions {
    sessionId?: string;
    userQuestion: string;
}

class ChatAIService {
    private supabase = getSupabase();

    async ask({ sessionId, userQuestion }: AskLawerAiOptions): Promise<StreamTextResult<any, any>> {
        // * Generate vector
        const queryVector = await aiService.generateEmbedding(userQuestion);

        // *Search vector
        const { data: contextArticles, error } = await this.supabase.rpc("match_law_articles", {
            query_embedding: queryVector,
            match_threshold: 0.5,
            match_count: 5,
        });

        if (error || !contextArticles) {
            throw new Error("Không thể truy xuất dữ liệu pháp luật.");
        }

        // * Build context
        const contextString = (contextArticles as LawArticle[])
            .map(
                (article, index) =>
                    `[Nguồn ${index + 1}]: ${article.law_title} - ${article.article_title}\nNội dung: ${article.content}`,
            )
            .join("\n\n---\n\n");

        const systemPrompt = `
                    Bạn là luật sư tư vấn chuyên nghiệp với nhiều năm kinh nghiệm. Nhiệm vụ của bạn là giải thích pháp luật một cách rõ ràng, dễ hiểu và chính xác cho người dùng.

                    PHONG CÁCH TRẢ LỜI:
                    - Giọng văn chuyên nghiệp nhưng gần gũi, dễ tiếp cận
                    - Đi thẳng vào vấn đề, không lan man
                    - Giải thích thuật ngữ pháp lý bằng ngôn ngữ đời thường khi cần
                    - Trình bày có cấu trúc, xuống dòng rõ ràng
                    - Đi thẳng vào vấn đề, KHÔNG mở đầu bằng "Chào bạn" hay giới thiệu bản thân
                    - Không có đoạn "Tóm lại" hay kết luận lặp lại ý đã trình bày
                    - Ví dụ nếu có thì chỉ 1 dòng, ngắn gọn

                    NGUỒN DỮ LIỆU PHÁP LUẬT (ưu tiên sử dụng):
                    ${contextString}

                    QUY TẮC XỬ LÝ:
                    1. Ưu tiên dùng dữ liệu pháp luật được cung cấp ở trên để trả lời.
                    2. Nếu dữ liệu trên chưa đủ, hãy dùng kiến thức pháp luật Việt Nam của bạn để bổ sung — khi đó ghi rõ "(Theo kiến thức tổng hợp)" bên cạnh thông tin đó.
                    3. Nếu hoàn toàn không có thông tin đáng tin cậy, hãy thành thật trả lời: "Tôi chưa có đủ thông tin chắc chắn về vấn đề này. Bạn nên tham khảo trực tiếp luật sư hoặc cơ quan có thẩm quyền."
                    4. Tuyệt đối không bịa đặt số hiệu văn bản, điều khoản, hay con số cụ thể.

                    ĐỊNH DẠNG TRẢ LỜI:
                    [Phần trả lời chính — rõ ràng, có cấu trúc]

                    ---
                    📌 **Căn cứ pháp lý tham khảo:**
                    - Điều X, [Tên Luật/Nghị định/Thông tư số ...]
                    - Điều Y, [Tên Luật/Nghị định/Thông tư số ...]
                    (Nếu không có căn cứ cụ thể thì ghi: "Dựa trên kiến thức pháp luật tổng hợp")

                    Câu hỏi của người dùng:
                    ${userQuestion}
                    `;

        const answer = await aiService.generateStreamText(systemPrompt);

        if (sessionId) {
            void (async () => {
                try {
                    const finalText = await answer.text;
                    await chatMessageService.createMessage(sessionId, finalText, "assistant");
                } catch (err: any) {
                    console.error("Lưu tin nhắn AI thất bại:", err);
                }
            })();
        }

        return answer;
    }

    async getTitle(message: string) {
        const result = await aiService.generateGoogleText(
            `Tóm tắt câu hỏi sau thành một tiêu đề ngắn gọn (dưới 6 từ): "${message}"`,
        );

        return result;
    }
}

export default new ChatAIService();
