import { Router } from "express";
import profilePublicController from "../controllers/profilePublic.controller.js";

export const profilesPublicRouter = Router();

profilesPublicRouter.get(
    "/:username",
    profilePublicController.getPublicProfile,
);
