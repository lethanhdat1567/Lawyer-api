import { Router } from "express";
import * as profilePublicController from "../controllers/profilePublic.controller.js";

export const profilesPublicRouter = Router();

profilesPublicRouter.get(
  "/:username",
  profilePublicController.getPublicProfile,
);
