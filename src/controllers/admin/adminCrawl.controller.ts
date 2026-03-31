import type { RequestHandler } from "express";
import adminCrawlService from "../../services/admin/adminCrawl.service.js";

class AdminCrawlController {
    postCrawlDraft: RequestHandler = async (req, res, next) => {
        const page_url = req.body.page_url;

        const result = await adminCrawlService.crawlAndInsert(page_url);

        return res.success(result);
    };
}

export default new AdminCrawlController();
