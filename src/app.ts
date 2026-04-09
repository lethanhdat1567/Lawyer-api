import express from "express";
import cors from "cors";
import helmet from "helmet";
import path from "path";
import { apiV1Router } from "./routes/index.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import { responseHelpers } from "./middlewares/responseHelpers.js";
import { createApiRateLimiter } from "./middlewares/rateLimit.js";
import { notFoundHandler } from "./middlewares/notFound.js";
import healthController from "./controllers/health.controller.js";
import { ensureUploadDir, getUploadStorePath } from "./lib/uploadPaths.js";

export function createApp(): express.Express {
    const app = express();
    const frontendUrl = process.env.FRONTEND_URL?.trim() || "http://localhost:3000";
    ensureUploadDir();
    app.use(
        helmet({
            crossOriginResourcePolicy: { policy: "cross-origin" },
        }),
    );
    app.use(
        cors({
            origin: frontendUrl,
            credentials: true,
        }),
    );
    app.use(
        "/upload",
        express.static(path.resolve(getUploadStorePath()), {
            fallthrough: true,
            maxAge: "7d",
        }),
    );
    app.use(express.json());
    app.use(responseHelpers);

    app.get("/health", healthController.getHealth);
    app.use("/api/v1", createApiRateLimiter(), apiV1Router);

    app.use(notFoundHandler);
    app.use(errorHandler);

    return app;
}
