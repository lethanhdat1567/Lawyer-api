import type { RequestHandler } from "express";
import adminLeaderboardService from "../../services/admin/adminLeaderboard.service.js";
import { adminLeaderboardQuerySchema } from "../../validators/admin.schema.js";

class AdminLeaderboardController {
    getLeaderboard: RequestHandler = async (req, res, next) => {
        try {
            const q = adminLeaderboardQuerySchema.parse(req.query);
            const data = await adminLeaderboardService.listLeaderboard({
                limit: q.limit,
                offset: q.offset,
            });
            res.success(data);
        } catch (e) {
            next(e);
        }
    };
}

export default new AdminLeaderboardController();
