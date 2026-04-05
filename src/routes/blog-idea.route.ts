import { Router } from "express";
import blogIdeaController from "../controllers/blogIdea.controller.js";

const blogIdeaRouter = Router();

blogIdeaRouter.get("/", blogIdeaController.listIdeas);
blogIdeaRouter.post("/", blogIdeaController.createIdea);
blogIdeaRouter.delete("/:id", blogIdeaController.destroyIdea);

export default blogIdeaRouter;
