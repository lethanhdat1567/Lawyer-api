import { Router } from "express";
import reputationAdminController from "../controllers/reputationAdmin.controller.js";

export const reputationAdminRouter = Router();

reputationAdminRouter.get(
    "/ledger",
    reputationAdminController.getAdminReputationLedger,
);
reputationAdminRouter.post(
    "/adjust",
    reputationAdminController.postAdminReputationAdjust,
);
