import { Router } from "express";
import * as adminController from "../controllers/admin.controller.js";

export const adminMiscRouter = Router();

adminMiscRouter.get("/stats", adminController.getAdminStatsHandler);
adminMiscRouter.get("/users", adminController.getAdminUsers);
adminMiscRouter.patch("/users/:id", adminController.patchAdminUser);
adminMiscRouter.get(
  "/lawyer-verifications",
  adminController.getAdminLawyerVerifications,
);
adminMiscRouter.patch(
  "/lawyer-verifications/:id",
  adminController.patchAdminLawyerVerification,
);
adminMiscRouter.get("/reports", adminController.getAdminReports);
adminMiscRouter.patch("/reports/:id", adminController.patchAdminReport);
adminMiscRouter.get("/leaderboard", adminController.getAdminLeaderboard);
adminMiscRouter.get("/legal-sources", adminController.getAdminLegalSources);
adminMiscRouter.post("/legal-sources", adminController.postAdminLegalSource);
adminMiscRouter.patch(
  "/legal-sources/:id",
  adminController.patchAdminLegalSource,
);
adminMiscRouter.delete(
  "/legal-sources/:id",
  adminController.deleteAdminLegalSource,
);
