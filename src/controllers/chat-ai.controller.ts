import type { RequestHandler, Response } from "express";
import { Readable } from "node:stream";
import chatSessionsService from "../services/chat-sessions.service.js";
import chatMessageService from "../services/chat-message.service.js";
import chatAiService from "../services/chat-ai.service.js";

/** Tells nginx and similar proxies not to buffer the body (keeps token streaming smooth in prod). */
function applyStreamThroughProxyHeaders(res: Response): void {
    res.setHeader("X-Accel-Buffering", "no");
    res.setHeader("Cache-Control", "no-cache, no-transform");
}

function pipeAiTextStream(res: Response, webResponse: globalThis.Response): void {
    res.status(webResponse.status);
    webResponse.headers.forEach((value, key) => {
        res.setHeader(key, value);
    });
    applyStreamThroughProxyHeaders(res);

    if (!webResponse.body) {
        res.end();
        return;
    }

    Readable.fromWeb(webResponse.body as any).pipe(res);
}

class ChatAiController {
    handleChat: RequestHandler = async (req, res, next) => {
        const { sessionId, message } = req.body;

        try {
            if (!message || typeof message !== "string" || !message.trim()) {
                return res.status(400).json({ message: "Tin nhắn không được để trống" });
            }

            if (!req.user) {
                const answer = await chatAiService.ask({
                    userQuestion: message.trim(),
                });
                pipeAiTextStream(res, answer.toTextStreamResponse());
                return;
            }

            const session = await chatSessionsService.getOwnedSession(sessionId, req.user.id);
            if (!session) {
                return res.status(404).json({ message: "Không tìm thấy phiên hội thoại" });
            }

            // *Create new title
            const totalMessage = await chatMessageService.countMessagesBySessionId(sessionId);
            if (totalMessage <= 0) {
                const newTitle = await chatAiService.getTitle(message);

                await chatSessionsService.updateTitle(sessionId, req.user.id, newTitle);
            }
            // *Create Message
            await chatMessageService.createMessage(sessionId, message, "user");

            // *Generate response
            const answer = await chatAiService.ask({
                sessionId,
                userQuestion: message,
            });

            pipeAiTextStream(res, answer.toTextStreamResponse());
        } catch (error) {
            next(error);
        }
    };

    getSessions: RequestHandler = async (req, res, next) => {
        try {
            if (!req.user) return void res.unauthorization();

            const userId = req.user.id;
            const search = typeof req.query.search === "string" ? req.query.search.trim() : undefined;
            const sessions = await chatSessionsService.getSessions(userId, search);

            return res.success(sessions);
        } catch (error) {
            next(error);
        }
    };

    getSessionDetail: RequestHandler = async (req, res, next) => {
        try {
            if (!req.user) return void res.unauthorization();

            const userId = req.user.id;
            const { sessionId } = req.params;

            const session = await chatSessionsService.getSessionDetail(sessionId as string, userId);

            if (!session) {
                return res.status(404).json({ message: "Không tìm thấy phiên hội thoại" });
            }

            return res.success(session);
        } catch (error) {
            next(error);
        }
    };

    createSession: RequestHandler = async (req, res, next) => {
        try {
            if (!req.user) return void res.unauthorization();

            const userId = req.user.id;
            const { title } = req.body;

            const newSession = await chatSessionsService.createSession(userId, title);

            return res.success(newSession);
        } catch (error) {
            next(error);
        }
    };

    updateSessionTitle: RequestHandler = async (req, res, next) => {
        try {
            if (!req.user) return void res.unauthorization();

            const userId = req.user.id;
            const { sessionId } = req.params;
            const { title } = req.body;

            if (!title) {
                return res.status(400).json({ message: "Tiêu đề không được để trống" });
            }

            const updatedSession = await chatSessionsService.updateTitle(sessionId as string, userId, title);
            if (!updatedSession) {
                return res.status(404).json({ message: "Không tìm thấy phiên hội thoại" });
            }

            return res.success(updatedSession);
        } catch (error) {
            next(error);
        }
    };

    deleteSession: RequestHandler = async (req, res, next) => {
        try {
            if (!req.user) return void res.unauthorization();

            const userId = req.user.id;
            const { sessionId } = req.params;

            const deletedSession = await chatSessionsService.deleteSession(sessionId as string, userId);
            if (!deletedSession) {
                return res.status(404).json({ message: "Không tìm thấy phiên hội thoại" });
            }

            return res.success({ message: "Xóa thành công" });
        } catch (error) {
            next(error);
        }
    };
}

export default new ChatAiController();
