import { Router } from "express";
import { adminCrawlRouter } from "./adminCrawl.route.js";
import { adminLeaderboardRouter } from "./adminLeaderboard.route.js";
import { adminStatsRouter } from "./adminStats.route.js";
import { adminUsersRouter } from "./adminUsers.route.js";
import { adminVerificationsRouter } from "./adminVerifications.route.js";

export const adminRouter = Router();

adminRouter.use(adminStatsRouter);
adminRouter.use(adminCrawlRouter);
adminRouter.use(adminUsersRouter);
adminRouter.use(adminVerificationsRouter);
adminRouter.use(adminLeaderboardRouter);
