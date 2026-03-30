import type { RequestHandler } from "express";
import adminPipelineService from "../../services/admin/adminPipeline.service.js";

class AdminPipelineController {
    getPipelineConfig: RequestHandler = async (_req, res, next) => {
        try {
            const data = await adminPipelineService.getPipelineConfig();
            res.success(data);
        } catch (e) {
            next(e);
        }
    };
}

export default new AdminPipelineController();
