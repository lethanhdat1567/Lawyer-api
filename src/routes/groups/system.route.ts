import { Router } from "express";
import { UserRole } from "../../../generated/prisma/enums.js";
import { authenticate, optionalAuth, requireRole } from "../../middlewares/auth.js";

import chatAIRouter from "../chat-ai.route.js";
import blogIdea from "../blog-idea.route.js";
import blogSchedule from "../blog-schedule.route.js";
import { authRouter } from "../auth.route.js";
import { healthRouter } from "../health.route.js";
import { uploadRouter } from "../upload.route.js";
import { createAuthRateLimiter } from "../../middlewares/rateLimit.js";

export const systemRoutesRouter = Router();

systemRoutesRouter.use(healthRouter);
systemRoutesRouter.use("/auth", createAuthRateLimiter(), authRouter);
systemRoutesRouter.use("/upload", createAuthRateLimiter(), uploadRouter);
systemRoutesRouter.use("/chat-ai", createAuthRateLimiter(), optionalAuth, chatAIRouter);
systemRoutesRouter.use("/blog-idea", createAuthRateLimiter(), authenticate, requireRole(UserRole.ADMIN), blogIdea);
systemRoutesRouter.use("/blog-schedule", createAuthRateLimiter(), blogSchedule);
