import { Router } from "express";
import { blogMeRouter } from "../blogMe.route.js";
import { hubMeRouter } from "../hubMe.route.js";
import { authenticate } from "../../middlewares/auth.js";

export const userRoutesRouter = Router();

userRoutesRouter.use("/hub/me", authenticate, hubMeRouter);
userRoutesRouter.use("/blog/me", authenticate, blogMeRouter);
