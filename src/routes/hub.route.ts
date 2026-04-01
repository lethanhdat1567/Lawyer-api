import { Router } from "express";
import hubPublicController from "../controllers/hubPublic.controller.js";

export const hubPublicRouter = Router();

hubPublicRouter.get("/posts", hubPublicController.getHubPosts);
hubPublicRouter.get("/posts/slug/:slug", hubPublicController.getHubPostBySlug);
