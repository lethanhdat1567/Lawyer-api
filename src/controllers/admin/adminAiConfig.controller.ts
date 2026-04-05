import type { RequestHandler } from "express";
import aiConfigService from "../../services/ai-config.service.js";
import { adminAiConfigPatchBodySchema } from "../../validators/admin.schema.js";

class AdminAiConfigController {
    getConfig: RequestHandler = async (_req, res, next) => {
        try {
            const config = await aiConfigService.getConfig();
            res.success({ config });
        } catch (e) {
            next(e);
        }
    };

    patchConfig: RequestHandler = async (req, res, next) => {
        try {
            const data = adminAiConfigPatchBodySchema.parse(req.body);
            await aiConfigService.getConfig();
            const config = await aiConfigService.updateConfig(data);
            res.success({ config });
        } catch (e) {
            next(e);
        }
    };
}

export default new AdminAiConfigController();
