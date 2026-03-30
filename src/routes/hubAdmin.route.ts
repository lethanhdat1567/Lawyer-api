import { Router } from "express";
import hubAdminController from "../controllers/hubAdmin.controller.js";

export const hubAdminRouter = Router();

hubAdminRouter.get("/posts", hubAdminController.getAdminHubPosts);
hubAdminRouter.post("/posts", hubAdminController.postAdminHubPost);
hubAdminRouter.get("/posts/:id", hubAdminController.getAdminHubPostById);
hubAdminRouter.patch("/posts/:id", hubAdminController.patchAdminHubPost);
hubAdminRouter.delete("/posts/:id", hubAdminController.deleteAdminHubPost);
