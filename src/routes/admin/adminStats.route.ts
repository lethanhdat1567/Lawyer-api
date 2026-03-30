import { Router } from "express";
import adminStatsController from "../../controllers/admin/adminStats.controller.js";

export const adminStatsRouter = Router();

adminStatsRouter.get("/stats", adminStatsController.getStats);
