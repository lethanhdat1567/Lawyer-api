import { Router } from "express";
import lawyerVerificationController from "../controllers/lawyerVerification.controller.js";

export const lawyerVerificationRouter = Router();

lawyerVerificationRouter.get("/", lawyerVerificationController.getMyVerification);
lawyerVerificationRouter.post("/", lawyerVerificationController.postMyVerification);
lawyerVerificationRouter.patch("/", lawyerVerificationController.patchMyVerification);
