import type { RequestHandler } from "express";
import adminStatsService from "../../services/admin/adminStats.service.js";

class AdminStatsController {
    getStats: RequestHandler = async (_req, res, next) => {
        try {
            const data = await adminStatsService.getStats();
            res.success({ stats: data });
        } catch (e) {
            next(e);
        }
    };
}

export default new AdminStatsController();
