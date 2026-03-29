import { CheerioCrawler, Dataset } from "crawlee";

export const runTestCrawler = async () => {
    console.log("--- Bắt đầu cào Bộ luật Dân sự (Cấu trúc chi tiết) ---");

    const crawler = new CheerioCrawler({
        // Chỉ cào đúng 1 trang này, tắt enqueueLinks
        async requestHandler({ $, request, log }) {
            const lawTitle = $("h1").text().trim() || $("title").text().trim();
            const articlesMap = new Map(); // Dùng Map để chống trùng

            let currentChapter = "Phần mở đầu";
            let lastArticleKey = "";

            const contentContainer = $(
                "#vcl-content, .content1, .content-html",
            ).first();

            contentContainer.find("p, div, a, b, span").each((_, el) => {
                const node = $(el);
                const text = node
                    .text()
                    .replace(/\r?\n|\r/g, " ")
                    .replace(/\s+/g, " ")
                    .trim();
                const nameAttr = node.attr("name") || "";

                if (!text && !nameAttr) return;

                // 1. Nhận diện Chương
                if (
                    nameAttr.includes("chuong") ||
                    /^CHƯƠNG\s+[IVXLM0-9]+/i.test(text)
                ) {
                    currentChapter = text;
                    return;
                }

                // 2. Nhận diện Điều (Regex chặt chẽ hơn để tránh bắt nhầm)
                const articleMatch = text.match(/^(Điều\s+\d+\.)/i);
                if (articleMatch) {
                    const title = text;
                    lastArticleKey = articleMatch[1]; // Key là "Điều 2."

                    if (!articlesMap.has(lastArticleKey)) {
                        articlesMap.set(lastArticleKey, {
                            lawTitle,
                            chapter: currentChapter,
                            articleTitle: title,
                            content: "",
                        });
                    }
                    return;
                }

                // 3. Gom nội dung (Nếu đã có tiêu đề Điều trước đó)
                if (lastArticleKey && articlesMap.has(lastArticleKey)) {
                    const article = articlesMap.get(lastArticleKey);
                    // Tránh cộng dồn chính cái tiêu đề vào content
                    if (!text.includes(article.articleTitle)) {
                        article.content += text + " ";
                    }
                }
            });

            // Chuyển Map thành mảng để lưu
            const finalData = Array.from(articlesMap.values()).filter(
                (a) => a.content.length > 0,
            );

            if (finalData.length > 0) {
                await Dataset.pushData(finalData);
                log.info(
                    `Đã lọc trùng và lưu ${finalData.length} điều sạch vào JSON.`,
                );
            }
        },

        // Bảo vệ: Chỉ chạy đúng 1 URL được cung cấp
        maxRequestsPerCrawl: 1,
    });

    await crawler.run([
        "https://thuvienphapluat.vn/van-ban/Quyen-dan-su/Bo-luat-dan-su-2015-296215.aspx",
    ]);
};
