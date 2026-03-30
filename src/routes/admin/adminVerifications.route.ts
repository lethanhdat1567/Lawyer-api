import { Router } from "express";
import adminVerificationsController from "../../controllers/admin/adminVerifications.controller.js";

export const adminVerificationsRouter = Router();

adminVerificationsRouter.get(
    "/lawyer-verifications",
    adminVerificationsController.getLawyerVerifications,
);
adminVerificationsRouter.patch(
    "/lawyer-verifications/:id",
    adminVerificationsController.patchLawyerVerification,
);
