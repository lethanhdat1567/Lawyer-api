import { Router } from "express";
import blogAdminController from "../controllers/blogAdmin.controller.js";

export const blogAdminRouter = Router();

blogAdminRouter.get("/posts", blogAdminController.getAdminBlogPosts);
blogAdminRouter.post("/posts", blogAdminController.postAdminBlogPost);
blogAdminRouter.get(
    "/posts/:id",
    blogAdminController.getAdminBlogPostByIdHandler,
);
blogAdminRouter.patch("/posts/:id", blogAdminController.patchAdminBlogPost);
blogAdminRouter.delete("/posts/:id", blogAdminController.deleteAdminBlogPost);
