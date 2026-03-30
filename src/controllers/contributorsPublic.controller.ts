import type { RequestHandler } from "express";
import contributorsPublicService from "../services/reputation/contributorsPublic.service.js";
import { contributorsLeaderboardQuerySchema } from "../validators/reputation.schema.js";

class ContributorsPublicController {
    getContributorsLeaderboard: RequestHandler = async (req, res, next) => {
        try {
            const q = contributorsLeaderboardQuerySchema.parse(req.query);
            const data = await contributorsPublicService.listLeaderboard({
                limit: q.limit,
            });
            res.success(data);
        } catch (e) {
            next(e);
        }
    };
}

export default new ContributorsPublicController();
