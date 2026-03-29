import { Router } from "express";
import { adminMiscRouter } from "./adminMisc.route.js";
import { authRouter } from "./auth.route.js";
import { blogAdminRouter } from "./blogAdmin.route.js";
import { blogMeRouter } from "./blogMe.route.js";
import { blogPublicRouter } from "./blog.route.js";
import { contributorsPublicRouter } from "./contributors.route.js";
import { healthRouter } from "./health.route.js";
import { hubAdminRouter } from "./hubAdmin.route.js";
import { hubMeRouter } from "./hubMe.route.js";
import { hubPublicRouter } from "./hub.route.js";
import { profilesPublicRouter } from "./profiles.route.js";
import { reputationAdminRouter } from "./reputationAdmin.route.js";
import { uploadRouter } from "./upload.route.js";
import { authenticate, requireRole } from "../middlewares/auth.js";
import { createAuthRateLimiter } from "../middlewares/rateLimit.js";
import { UserRole } from "../../generated/prisma/enums.js";

export const apiV1Router = Router();

apiV1Router.use(healthRouter);
apiV1Router.use("/auth", createAuthRateLimiter(), authRouter);
apiV1Router.use("/upload", createAuthRateLimiter(), uploadRouter);
apiV1Router.use("/profiles", profilesPublicRouter);
apiV1Router.use("/contributors", contributorsPublicRouter);
apiV1Router.use("/hub", hubPublicRouter);
apiV1Router.use("/hub/me", authenticate, hubMeRouter);
apiV1Router.use("/blog", blogPublicRouter);
apiV1Router.use("/blog/me", authenticate, blogMeRouter);
apiV1Router.use(
  "/admin/hub",
  authenticate,
  requireRole(UserRole.ADMIN),
  hubAdminRouter,
);
apiV1Router.use(
  "/admin/blog",
  authenticate,
  requireRole(UserRole.ADMIN),
  blogAdminRouter,
);
apiV1Router.use(
  "/admin/reputation",
  authenticate,
  requireRole(UserRole.ADMIN),
  reputationAdminRouter,
);
apiV1Router.use(
  "/admin",
  authenticate,
  requireRole(UserRole.ADMIN),
  adminMiscRouter,
);
