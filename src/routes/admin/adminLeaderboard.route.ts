import { Router } from "express";
import adminLeaderboardController from "../../controllers/admin/adminLeaderboard.controller.js";

export const adminLeaderboardRouter = Router();

adminLeaderboardRouter.get(
    "/leaderboard",
    adminLeaderboardController.getLeaderboard,
);
