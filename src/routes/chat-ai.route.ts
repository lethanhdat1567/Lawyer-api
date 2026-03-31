import { Router } from "express";
import chatAiController from "../controllers/chat-ai.controller.js";

const chatRouter = Router();

chatRouter.post("/", chatAiController.handleChat);

chatRouter.get("/sessions", chatAiController.getSessions);
chatRouter.get("/sessions/:sessionId", chatAiController.getSessionDetail);

chatRouter.post("/sessions", chatAiController.createSession);

chatRouter.patch("/sessions/:sessionId", chatAiController.updateSessionTitle);

chatRouter.delete("/sessions/:sessionId", chatAiController.deleteSession);

export default chatRouter;
