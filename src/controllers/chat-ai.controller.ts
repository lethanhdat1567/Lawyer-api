import type { RequestHandler } from "express";
import { Context } from "hono";
import { chatWithLawyer } from "../services/chat-ai.service.js";

export const handleChat: RequestHandler = async (req, res, next) => {
    try {
        const { question } = req.body;
        const answer = await chatWithLawyer(question);
        res.success({ answer });
    } catch (e) {
        next(e);
    }
};
