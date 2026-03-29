import { Router } from "express";
import * as blogPublicController from "../controllers/blogPublic.controller.js";

export const blogPublicRouter = Router();

blogPublicRouter.get("/tags", blogPublicController.getBlogTags);
blogPublicRouter.get("/posts", blogPublicController.getBlogPosts);
blogPublicRouter.get(
  "/posts/slug/:slug",
  blogPublicController.getBlogPostBySlug,
);
