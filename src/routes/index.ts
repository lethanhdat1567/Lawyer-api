import { Router } from "express";
import { authRouter } from "./auth.route.js";
import { healthRouter } from "./health.route.js";
import { uploadRouter } from "./upload.route.js";
import { createAuthRateLimiter } from "../middlewares/rateLimit.js";

export const apiV1Router = Router();

apiV1Router.use(healthRouter);
apiV1Router.use("/auth", createAuthRateLimiter(), authRouter);
apiV1Router.use("/upload", createAuthRateLimiter(), uploadRouter);
