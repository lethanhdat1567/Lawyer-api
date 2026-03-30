import { Router } from "express";
import adminPipelineController from "../../controllers/admin/adminPipeline.controller.js";

export const adminPipelineRouter = Router();

adminPipelineRouter.get(
    "/pipeline-config",
    adminPipelineController.getPipelineConfig,
);
