import { Router } from "express";
import { blogMeRouter } from "../blogMe.route.js";
import { hubMeRouter } from "../hubMe.route.js";
import { lawyerVerificationRouter } from "../lawyerVerification.route.js";
import { authenticate } from "../../middlewares/auth.js";

export const userRoutesRouter = Router();

userRoutesRouter.use("/hub/me", authenticate, hubMeRouter);
userRoutesRouter.use("/blog/me", authenticate, blogMeRouter);
userRoutesRouter.use(
    "/lawyer-verifications/me",
    authenticate,
    lawyerVerificationRouter,
);
