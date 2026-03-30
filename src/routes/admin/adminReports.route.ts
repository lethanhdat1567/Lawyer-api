import { Router } from "express";
import adminReportsController from "../../controllers/admin/adminReports.controller.js";

export const adminReportsRouter = Router();

adminReportsRouter.get("/reports", adminReportsController.getReports);
adminReportsRouter.patch("/reports/:id", adminReportsController.patchReport);
