import { CheerioCrawler } from "crawlee";
import { syncLawWithVercelSDK } from "../services/law-sync.service.js";

export interface LawArticle {
    id?: string;
    law_title: string | null;
    chapter: string | null;
    article_title: string | null;
    content: string;
    url: string | null;
    embedding?: number[] | null;
    created_at?: string;
}

export const runLawyerCrawler = async (): Promise<void> => {
    const CRAWLER_URL =
        "https://thuvienphapluat.vn/van-ban/Quyen-dan-su/Bo-luat-dan-su-2015-296215.aspx";

    const crawler = new CheerioCrawler({
        async requestHandler({ $, log }) {
            const lawTitle: string = $("h1").text().trim() || "Bộ luật Dân sự";
            const results: LawArticle[] = [];

            let currentChapter: string = "Phần mở đầu";
            let currentArticle: LawArticle | null = null;

            const contentNodes = $("#vcl-content, .content1").find("p");

            contentNodes.each((_, el) => {
                const node = $(el);
                const text: string = node.text().replace(/\s+/g, " ").trim();
                if (!text) return;

                const isChapter: boolean =
                    node.find('a[name^="chuong"]').length > 0 ||
                    /^Chương\s+[IVXLM0-9]+/i.test(text) ||
                    /^Phần\s+thứ/i.test(text);

                if (isChapter) {
                    currentChapter = text;
                    return;
                }

                const isArticleHeader: boolean =
                    node.find('a[name^="dieu_"]').length > 0 ||
                    /^Điều\s+\d+\./i.test(text);

                if (isArticleHeader) {
                    if (currentArticle) results.push(currentArticle);
                    currentArticle = {
                        law_title: lawTitle,
                        chapter: currentChapter,
                        article_title: text,
                        content: "",
                        url: CRAWLER_URL,
                    };
                    return;
                }

                if (currentArticle && text !== currentArticle.article_title) {
                    currentArticle.content += text + "\n";
                }
            });

            if (currentArticle) results.push(currentArticle);

            // Clean & Filter
            const finalData: LawArticle[] = results
                .map((item) => ({
                    ...item,
                    content: item.content.trim(),
                }))
                .filter((item) => item.content.length > 10);

            if (finalData.length > 0) {
                log.info(
                    `--- [CRAWL DONE] Đã lấy ${finalData.length} điều. Bắt đầu Sync... ---`,
                );

                await syncLawWithVercelSDK(finalData);

                log.info(
                    `--- [COMPLETED] Quá trình cào và lưu DB đã hoàn tất ---`,
                );
            } else {
                log.error("--- [FAILED] Không tìm thấy dữ liệu phù hợp ---");
            }
        },
        maxRequestsPerCrawl: 1,
    });

    // Chạy crawler
    await crawler.run([CRAWLER_URL]);
};
