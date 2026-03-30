import { Router } from "express";
import chatAIRouter from "../chat-ai.route.js";
import { authRouter } from "../auth.route.js";
import { healthRouter } from "../health.route.js";
import { uploadRouter } from "../upload.route.js";
import { createAuthRateLimiter } from "../../middlewares/rateLimit.js";

export const systemRoutesRouter = Router();

systemRoutesRouter.use(healthRouter);
systemRoutesRouter.use("/auth", createAuthRateLimiter(), authRouter);
systemRoutesRouter.use("/upload", createAuthRateLimiter(), uploadRouter);
systemRoutesRouter.use("/chat-ai", chatAIRouter);
