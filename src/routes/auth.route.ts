import { Router } from "express";
import authController from "../controllers/auth.controller.js";
import meController from "../controllers/me.controller.js";
import profileController from "../controllers/profile.controller.js";
import { authenticate, optionalAuth } from "../middlewares/auth.js";

export const authRouter = Router();

authRouter.post("/register", authController.postRegister);
authRouter.post("/login", authController.postLogin);
authRouter.post("/refresh", authController.postRefresh);
authRouter.post("/logout", authController.postLogout);
authRouter.get("/verify-email", authController.getVerifyEmail);
authRouter.post("/forgot-password", authController.postForgotPassword);
authRouter.post("/reset-password", authController.postResetPassword);
authRouter.post("/firebase", authController.postFirebase);
authRouter.get("/me", optionalAuth, meController.getMe);
authRouter.patch("/profile", authenticate, profileController.patchProfile);
