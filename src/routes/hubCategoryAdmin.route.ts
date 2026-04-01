import { Router } from "express";
import hubCategoryAdminController from "../controllers/hubCategoryAdmin.controller.js";

export const hubCategoryAdminRouter = Router();

hubCategoryAdminRouter.post("/", hubCategoryAdminController.postAdminHubCategory);
hubCategoryAdminRouter.patch("/:id", hubCategoryAdminController.patchAdminHubCategory);
hubCategoryAdminRouter.delete("/:id", hubCategoryAdminController.deleteAdminHubCategory);
