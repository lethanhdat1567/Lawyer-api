import type { RequestHandler } from "express";
import adminStatsService from "../../services/admin/adminStats.service.js";
import { adminStatsQuerySchema } from "../../validators/admin.schema.js";

class AdminStatsController {
    getStats: RequestHandler = async (req, res, next) => {
        try {
            const q = adminStatsQuerySchema.parse(req.query);
            const data = await adminStatsService.getStats(q);
            res.success(data);
        } catch (e) {
            next(e);
        }
    };
}

export default new AdminStatsController();
