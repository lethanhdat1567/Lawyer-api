import { CheerioCrawler, CheerioRoot } from "crawlee";
import { LawArticleInsert } from "../../types/crawl.js";
import { LawParserHelper } from "../../lib/lawParser.js";
import aiService from "../ai.service.js";
import { getSupabase } from "../../lib/supabase.js";

class AdminCrawlService {
    private TEST_LIMIT: number = 10;

    private cleanPage($: CheerioRoot) {
        $(
            '.tieng-anh, .English, .pro-member-note, .note-pro, [style*="color: #0000FF"], [style*="color:blue"]',
        ).remove();
        $("script, style, iframe").remove();
    }

    private async getCrawler(results: LawArticleInsert[]) {
        return new CheerioCrawler({
            requestHandlerTimeoutSecs: 900,
            requestHandler: async ({ $, request, log }) => {
                this.cleanPage($);

                const lawTitle = $("h1").text().trim() || "Văn bản pháp luật";
                const tempArticles: LawArticleInsert[] = [];

                let currentChapter: string | null = null;
                let currentArticle: LawArticleInsert | null = null;
                let skipUntilNextArticle = false;

                // BƯỚC 1: TRÍCH XUẤT TEXT
                $(".content1 p, .content1 div").each((_, el) => {
                    // Dừng trích xuất nếu đã đủ số lượng TEST_LIMIT
                    if (tempArticles.length >= this.TEST_LIMIT) return false;

                    const node = $(el);
                    const text = node.text().replace(/\s+/g, " ").trim();
                    if (!text || text.includes("Thành viên Pro")) return;

                    const isChapter =
                        node.find('a[name^="chuong_"], a[name^="loai_"]').length > 0 ||
                        /^(Phần|Chương|Mục)\s+[0-9IVXLM]+/i.test(text);

                    if (isChapter && !LawParserHelper.isEnglish(text)) {
                        currentChapter = text;
                        skipUntilNextArticle = false;
                        return;
                    }

                    const isArticleHeader = node.find('a[name^="dieu_"]').length > 0 || /^Điều\s+\d+\./i.test(text);

                    if (isArticleHeader) {
                        if (LawParserHelper.isEnglish(text)) {
                            skipUntilNextArticle = true;
                            return;
                        }
                        if (currentArticle) tempArticles.push(currentArticle);

                        currentArticle = {
                            law_title: lawTitle,
                            chapter: currentChapter,
                            article_title: text,
                            article_number: LawParserHelper.extractArticleNumber(text),
                            content: "",
                            source_url: request.loadedUrl,
                            embedding: [],
                        };
                        skipUntilNextArticle = false;
                        return;
                    }

                    if (currentArticle && !skipUntilNextArticle) {
                        if (LawParserHelper.isEnglish(text)) {
                            skipUntilNextArticle = true;
                            return;
                        }
                        if (text !== currentArticle.article_title) {
                            currentArticle.content += text + "\n";
                        }
                    }
                });

                // Đẩy article cuối cùng vào list nếu còn
                if (currentArticle && tempArticles.length < this.TEST_LIMIT) {
                    tempArticles.push(currentArticle);
                }

                // BƯỚC 2: LỌC DỮ LIỆU SẠCH
                const finalData = tempArticles.filter(
                    (item) => item.content.trim().length > 20 && LawParserHelper.hasVietnamese(item.content),
                );

                log.info(`Test Mode Active: Processing ${finalData.length} articles (Limit: ${this.TEST_LIMIT})`);

                // BƯỚC 3: XỬ LÝ EMBEDDING (Gửi 1 mẻ duy nhất cho nhanh)
                if (finalData.length > 0) {
                    const textsToEmbed = finalData.map((item) => {
                        return `Văn bản: ${item.law_title}\n${item.chapter ? `Chương: ${item.chapter}\n` : ""}Tiêu đề: ${item.article_title}\nNội dung: ${item.content}`
                            .replace(/\s+/g, " ")
                            .trim();
                    });

                    try {
                        const embeddings = await aiService.generateBatchEmbeddings(textsToEmbed);
                        finalData.forEach((item, idx) => {
                            item.embedding = embeddings[idx] || [];
                        });
                        log.info(`Successfully generated embeddings for ${finalData.length} items.`);
                    } catch (error) {
                        log.error(`Embedding failed: ${error}`);
                        throw error;
                    }
                }

                results.push(...finalData);
            },
            maxRequestsPerCrawl: 1,
        });
    }

    public async crawlAndInsert(page_url: string) {
        const results: LawArticleInsert[] = [];
        const crawler = await this.getCrawler(results);
        await crawler.run([page_url]);

        if (results.length === 0) {
            return { message: "No valid articles found." };
        }

        const supabase = getSupabase();
        const { data, error } = await supabase
            .from("law_articles")
            .upsert(results, {
                onConflict: "source_url, article_title",
            })
            .select("id");

        if (error) {
            console.error("Supabase error:", error.message);
            throw error;
        }

        return {
            message: "Crawl and Insert success!",
            count: data?.length || 0,
        };
    }
}

export default new AdminCrawlService();
