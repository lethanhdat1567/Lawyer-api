import { Router } from "express";
import chatAiController from "../controllers/chat-ai.controller.js";

const chatRouter = Router();

chatRouter.post("/", chatAiController.handleChat);

export default chatRouter;
