import type { RequestHandler } from "express";
import chatSessionsService from "../services/chat-sessions.service.js";

class ChatAiController {
    /**
     * POST /api/chat
     * Xử lý stream AI (để trống logic theo yêu cầu)
     */
    handleChat: RequestHandler = async (req, res, next) => {
        try {
            // Logic xử lý RAG & Streaming sẽ viết ở đây
        } catch (error) {
            next(error);
        }
    };

    /**
     * GET /api/chat/sessions
     */
    getSessions: RequestHandler = async (req, res, next) => {
        try {
            const userId = (req as any).user.id;
            const sessions = await chatSessionsService.getSessions(userId);

            // @ts-ignore - Giả định bạn có helper res.success
            return res.success(sessions);
        } catch (error) {
            next(error);
        }
    };

    /**
     * GET /api/chat/sessions/:sessionId
     */
    getSessionDetail: RequestHandler = async (req, res, next) => {
        try {
            const userId = (req as any).user.id;
            const { sessionId } = req.params;

            const session = await chatSessionsService.getSessionDetail(
                sessionId as string,
                userId,
            );

            if (!session) {
                return res
                    .status(404)
                    .json({ message: "Không tìm thấy phiên hội thoại" });
            }

            // @ts-ignore
            return res.success(session);
        } catch (error) {
            next(error);
        }
    };

    /**
     * POST /api/chat/sessions
     */
    createSession: RequestHandler = async (req, res, next) => {
        try {
            const userId = (req as any).user.id;
            const { title } = req.body;

            const newSession = await chatSessionsService.createSession(
                userId,
                title,
            );

            // @ts-ignore
            return res.success(newSession);
        } catch (error) {
            next(error);
        }
    };

    /**
     * PATCH /api/chat/sessions/:sessionId
     */
    updateSessionTitle: RequestHandler = async (req, res, next) => {
        try {
            const userId = (req as any).user.id;
            const { sessionId } = req.params;
            const { title } = req.body;

            if (!title) {
                return res
                    .status(400)
                    .json({ message: "Tiêu đề không được để trống" });
            }

            const updatedSession = await chatSessionsService.updateTitle(
                sessionId as string,
                userId,
                title,
            );

            // @ts-ignore
            return res.success(updatedSession);
        } catch (error) {
            next(error);
        }
    };

    /**
     * DELETE /api/chat/sessions/:sessionId
     */
    deleteSession: RequestHandler = async (req, res, next) => {
        try {
            const userId = (req as any).user.id;
            const { sessionId } = req.params;

            await chatSessionsService.deleteSession(
                sessionId as string,
                userId,
            );

            // @ts-ignore
            return res.success({ message: "Xóa thành công" });
        } catch (error) {
            next(error);
        }
    };
}

export default new ChatAiController();
