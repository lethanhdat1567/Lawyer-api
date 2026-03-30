import { Router } from "express";
import { blogPublicRouter } from "../blog.route.js";
import { contributorsPublicRouter } from "../contributors.route.js";
import { hubPublicRouter } from "../hub.route.js";
import { profilesPublicRouter } from "../profiles.route.js";

export const publicRoutesRouter = Router();

publicRoutesRouter.use("/profiles", profilesPublicRouter);
publicRoutesRouter.use("/contributors", contributorsPublicRouter);
publicRoutesRouter.use("/hub", hubPublicRouter);
publicRoutesRouter.use("/blog", blogPublicRouter);
