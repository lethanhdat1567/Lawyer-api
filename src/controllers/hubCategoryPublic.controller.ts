import type { RequestHandler } from "express";
import hubCategoryPublicService from "../services/hub/hubCategoryPublic.service.js";

class HubCategoryPublicController {
    getHubCategories: RequestHandler = async (_req, res, next) => {
        try {
            const categories = await hubCategoryPublicService.listCategories();
            res.success({ categories });
        } catch (e) {
            next(e);
        }
    };
}

export default new HubCategoryPublicController();
