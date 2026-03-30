import type { RequestHandler } from "express";
import adminCrawlService from "../../services/admin/adminCrawl.service.js";
import {
    adminCrawlApproveBodySchema,
    adminCrawlDraftBodySchema,
} from "../../validators/admin.schema.js";

class AdminCrawlController {
    postCrawlDraft: RequestHandler = async (req, res, next) => {
        try {
            const body = adminCrawlDraftBodySchema.parse(req.body);
            const data = await adminCrawlService.createCrawlDraft({
                url: body.url,
                overrides: body.overrides,
            });
            res.success(data);
        } catch (e) {
            next(e);
        }
    };

    postCrawlApprove: RequestHandler = async (req, res, next) => {
        try {
            const body = adminCrawlApproveBodySchema.parse(req.body);
            const data = await adminCrawlService.approveCrawlDraft({
                crawlLogId: body.crawlLogId,
                url: body.url,
                markdownDraft: body.markdownDraft,
                category: body.category ?? null,
                metadata: body.metadata,
                desiredStatus: body.desiredStatus,
            });
            res.success(data);
        } catch (e) {
            next(e);
        }
    };
}

export default new AdminCrawlController();
