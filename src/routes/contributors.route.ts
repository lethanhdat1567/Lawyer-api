import { Router } from "express";
import * as contributorsPublicController from "../controllers/contributorsPublic.controller.js";

export const contributorsPublicRouter = Router();

contributorsPublicRouter.get(
  "/leaderboard",
  contributorsPublicController.getContributorsLeaderboard,
);
