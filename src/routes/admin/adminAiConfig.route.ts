import { Router } from "express";
import adminAiConfigController from "../../controllers/admin/adminAiConfig.controller.js";

export const adminAiConfigRouter = Router();

adminAiConfigRouter.get("/", adminAiConfigController.getConfig);
adminAiConfigRouter.patch("/", adminAiConfigController.patchConfig);
