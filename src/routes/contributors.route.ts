import { Router } from "express";
import contributorsPublicController from "../controllers/contributorsPublic.controller.js";

export const contributorsPublicRouter = Router();

contributorsPublicRouter.get(
    "/leaderboard",
    contributorsPublicController.getContributorsLeaderboard,
);
