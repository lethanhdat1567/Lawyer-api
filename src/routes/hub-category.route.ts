import { Router } from "express";
import hubCategoryPublicController from "../controllers/hubCategoryPublic.controller.js";

export const hubCategoryPublicRouter = Router();

hubCategoryPublicRouter.get("/", hubCategoryPublicController.getHubCategories);
