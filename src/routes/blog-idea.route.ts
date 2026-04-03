import { Router } from "express";
import blogIdeaController from "../controllers/blogIdea.controller.js";

const blogIdeaRouter = Router();

blogIdeaRouter.post("/", blogIdeaController.createIdea);

export default blogIdeaRouter;
