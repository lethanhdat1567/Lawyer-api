import { CheerioCrawler, CheerioRoot } from "crawlee";
import { LawArticleInsert } from "../../types/crawl.js";
import { LawParserHelper } from "../../lib/lawParser.js";
import { getSupabase } from "../../lib/supabase.js";
import { queueService } from "../queue.service.js";
import { AI_EMBEDDING_QUEUE, AI_FEEDBACK_QUEUE } from "../../constants/queue.js";
import { getPrisma } from "../../lib/prisma.js";

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
            requestHandler: async ({ $, request }) => {
                this.cleanPage($);

                const lawTitle = $("h1").text().trim() || "Văn bản pháp luật";
                let currentChapter: string | null = null;
                let currentArticle: LawArticleInsert | null = null;
                let skipUntilNextArticle = false;

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
                        if (currentArticle) results.push(currentArticle);
                        currentArticle = {
                            law_title: lawTitle,
                            chapter: currentChapter,
                            article_title: text,
                            article_number: LawParserHelper.extractArticleNumber(text),
                            content: "",
                            source_url: request.loadedUrl,
                            embedding: null, // Để null để worker xử lý sau
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

                if (currentArticle) results.push(currentArticle);
            },
            maxRequestsPerCrawl: 2, // Bạn nói chỉ cào 1 page mỗi lần
        });
    }

    public async crawlAndInsert(page_url: string) {
        const rawResults: LawArticleInsert[] = [];

        const crawler = await this.getCrawler(rawResults);

        await crawler.run([page_url]);

        if (rawResults.length === 0) {
            return { message: "No raw articles found.", count: 0 };
        }

        const finalData = rawResults.filter(
            (item) => item.content.trim().length > 20 && LawParserHelper.hasVietnamese(item.content),
        );

        const supabase = getSupabase();

        try {
            const { data, error } = await supabase
                .from("law_articles")
                .upsert(finalData, { onConflict: "source_url, article_title" })
                .select("id, law_title, article_title, content");

            if (error) {
                throw error;
            }

            if (data && data.length > 0) {
                const prisma = await getPrisma();

                await prisma.queue.createMany({
                    data: data.map((item) => ({
                        type: AI_EMBEDDING_QUEUE,
                        status: "pending",
                        payload: {
                            id: item.id,
                        },
                    })),
                });
            }

            return {
                message: "Crawl and Insert success!",
                count: data?.length || 0,
            };
        } catch (err) {
            throw err;
        }
    }
}

export default new AdminCrawlService();
