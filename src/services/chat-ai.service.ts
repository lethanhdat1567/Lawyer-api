import { embed, generateText } from "ai";
import { model, lawModel } from "../lib/ai.js";
import { getSupabase } from "../lib/supabase.js";
import { LawArticle } from "../schedules/crawler.js";
import { GoogleEmbeddingModelOptions } from "@ai-sdk/google";

// Sử dụng interface bạn đã cung cấp

export const chatWithLawyer = async (userQuery: string) => {
    const supabase = getSupabase();

    // 1. Chuyển câu hỏi thành vector
    const { embedding } = await embed({
        model: model,
        value: userQuery,
        providerOptions: {
            google: {
                outputDimensionality: 768,
            } satisfies GoogleEmbeddingModelOptions,
        },
    });

    // 2. Gọi RPC tìm kiếm (Kết quả trả về sẽ kèm theo trường similarity)
    const { data: contextArticles, error } = (await supabase.rpc(
        "match_law_articles",
        {
            query_embedding: embedding,
            match_threshold: 0.2,
            match_count: 5,
        },
    )) as { data: (LawArticle & { similarity: number })[] | null; error: any };

    if (error) throw new Error(`Lỗi tìm kiếm: ${error.message}`);
    if (!contextArticles || contextArticles.length === 0) {
        return {
            answer: "Tôi không tìm thấy thông tin luật pháp liên quan đến yêu cầu của bạn.",
            sources: [],
        };
    }

    // 3. Xây dựng Context cho AI
    const contextText = contextArticles
        .map((a) => `[${a.article_title}]: ${a.content}`)
        .join("\n\n");

    const prompt = `
        Bạn là "LawyerAI" - Trợ lý luật pháp Việt Nam. Phản hồi súc tích, đi thẳng vào vấn đề, giọng văn tự nhiên như một chuyên gia tư vấn trực tiếp, không rập khuôn.

        DỮ LIỆU LUẬT (CONTEXT):
        ---
        ${contextText}
        ---

        CÂU HỎI: "${userQuery}"

        YÊU CẦU PHẢN HỒI (NGẮN GỌN & TỰ NHIÊN):

        1. **Phân tích nhanh**: 1-2 câu tóm gọn vấn đề của khách.
        2. **Căn cứ pháp lý**: Trích đúng Điều, Khoản (Dùng quote >). Không viết lại cả đoạn luật nếu không cần thiết.
        3. **Nói một cách dễ hiểu**: Giải thích "tiếng người" về quyền lợi/nghĩa vụ của khách. Tránh dùng từ hán việt nặng nề nếu có từ thuần việt thay thế.
        4. **Chốt hạ**: Lời khuyên cụ thể phải làm gì ngay lúc này.

        QUY TẮC CỨNG:
        - Không mở bài/kết bài rườm rà (Bỏ qua: "Chào bạn", "Hy vọng câu trả lời giúp ích").
        - Nếu Context không có thông tin phù hợp -> Trả lời: "Hiện tại dữ liệu của tôi chưa có quy định cụ thể về vấn đề này."
        - Phông chữ: Sử dụng Markdown (In đậm các con số, thời hạn, mức phạt).

        HÀNH ĐỘNG: PHÂN TÍCH VÀ TRẢ LỜI NGAY.
        `;

    const { text } = await generateText({
        model: lawModel,
        prompt: prompt,
    });

    return {
        answer: text,
        sources: contextArticles.map((a) => ({
            title: a.article_title,
            url: a.url,
        })),
    };
};
