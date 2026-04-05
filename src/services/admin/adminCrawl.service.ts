import { CheerioCrawler, CheerioRoot } from "crawlee";
import { LawArticleInsert } from "../../types/crawl.js";
import { LawParserHelper } from "../../lib/lawParser.js";
import { getSupabase } from "../../lib/supabase.js";
import { LocalAiService } from "../localAi.service.js";

class AdminCrawlService {
    private cleanPage($: CheerioRoot) {
        $(
            '.tieng-anh, .English, .pro-member-note, .note-pro, [style*="color: #0000FF"], [style*="color:blue"]',
        ).remove();
        $("script, style, iframe").remove();
    }

    private async getCrawler(results: LawArticleInsert[]) {
        return new CheerioCrawler({
            requestHandlerTimeoutSecs: 3600,
            requestHandler: async ({ $, request, log }) => {
                this.cleanPage($);

                const lawTitle = $("h1").text().trim() || "Văn bản pháp luật";
                const tempArticles: LawArticleInsert[] = [];
                let currentChapter: string | null = null;
                let currentArticle: LawArticleInsert | null = null;
                let skipUntilNextArticle = false;

                // BƯỚC 1: TRÍCH XUẤT TEXT (Giữ nguyên logic của bạn)
                $(".content1 p, .content1 div").each((_, el) => {
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

                if (currentArticle) tempArticles.push(currentArticle);

                // BƯỚC 2: LỌC DỮ LIỆU SẠCH
                const finalData = tempArticles.filter(
                    (item) => item.content.trim().length > 20 && LawParserHelper.hasVietnamese(item.content),
                );

                // BƯỚC 3: LOCAL EMBEDDING
                if (finalData.length > 0) {
                    log.info(`Crawled ${finalData.length} articles. Starting LOCAL Embedding...`);

                    // Gom toàn bộ text cần embed
                    const allTexts = finalData.map((item) => {
                        return `${item.law_title} ${item.article_title} ${item.content}`.replace(/\s+/g, " ").trim();
                    });

                    try {
                        // Gọi một lần vào Service, để Service tự quản lý việc chia nhỏ hoặc chạy loop
                        const allEmbeddings = await LocalAiService.generateBatch(allTexts);

                        finalData.forEach((item, idx) => {
                            item.embedding = allEmbeddings[idx] || [];
                        });

                        log.info(`✅ Hoàn thành LOCAL embedding cho ${finalData.length} mục.`);
                    } catch (err) {
                        log.error(`❌ Lỗi khi tạo embedding: ${err}`);
                        throw err;
                    }
                }

                results.push(...finalData);
            },
            maxRequestsPerCrawl: 100,
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
