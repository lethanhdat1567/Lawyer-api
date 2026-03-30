import { google, GoogleEmbeddingModelOptions } from "@ai-sdk/google";
import { embedMany } from "ai";
import { LawArticle } from "../schedules/crawler.js";
import { getSupabase } from "../lib/supabase.js";
import { model } from "../lib/ai.js";

export const syncLawWithVercelSDK = async (articles: LawArticle[]) => {
    const supabase = getSupabase();

    const testArticles = articles.slice(0, 20);
    const BATCH_SIZE = 5;
    const DELAY_BETWEEN_BATCHES = 1000;

    console.log(
        `🧪 ĐANG CHẠY TEST: Chỉ xử lý ${testArticles.length} điều luật mẫu...`,
    );

    for (let i = 0; i < testArticles.length; i += BATCH_SIZE) {
        const batch = testArticles.slice(i, i + BATCH_SIZE);

        try {
            console.log(
                `📡 Đang gọi Gemini Embedding cho ${batch.length} điều...`,
            );

            const { embeddings } = await embedMany({
                model: model,
                providerOptions: {
                    google: {
                        outputDimensionality: 768,
                    } satisfies GoogleEmbeddingModelOptions,
                },
                values: batch.map(
                    (a) =>
                        `Điều luật: ${a.article_title}\nNội dung: ${a.content}`,
                ),
            });

            const rows = batch.map((article, index) => ({
                law_title: article.law_title,
                chapter: article.chapter,
                article_title: article.article_title,
                content: article.content,
                embedding: embeddings[index],
                url: article.url,
            }));

            console.log("💾 Đang đẩy dữ liệu mẫu vào Supabase...");
            const { error } = await supabase.from("law_articles").insert(rows);

            if (error) throw error;

            console.log(
                `✅ TEST THÀNH CÔNG: Đã chèn ${i + batch.length} điều vào DB.`,
            );

            if (i + BATCH_SIZE < testArticles.length) {
                await new Promise((resolve) =>
                    setTimeout(resolve, DELAY_BETWEEN_BATCHES),
                );
            }
        } catch (err) {
            console.error(`❌ Lỗi Test tại vị trí ${i}:`, err);
        }
    }
    console.log("✨ Hoàn tất quá trình chạy thử.");
};
