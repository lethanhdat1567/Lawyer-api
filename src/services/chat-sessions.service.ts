import { getPrisma } from "../lib/prisma.js";

class ChatSessionService {
    async getSessions(userId: string) {
        const prisma = getPrisma();
        return await prisma.chatSession.findMany({
            where: { userId },
            orderBy: { updatedAt: "desc" },
            select: {
                id: true,
                title: true,
                createdAt: true,
                updatedAt: true,
            },
        });
    }

    async getSessionDetail(sessionId: string, userId: string) {
        const prisma = getPrisma();
        return await prisma.chatSession.findFirst({
            where: { id: sessionId, userId },
            include: {
                messages: {
                    orderBy: { createdAt: "asc" },
                },
            },
        });
    }

    async createSession(userId: string, title?: string) {
        const prisma = getPrisma();
        return await prisma.chatSession.create({
            data: {
                userId,
                title: title || "Cuộc trò chuyện mới",
            },
        });
    }

    async updateTitle(sessionId: string, userId: string, title: string) {
        const prisma = getPrisma();
        return await prisma.chatSession.update({
            where: { id: sessionId, userId },
            data: { title },
        });
    }

    async deleteSession(sessionId: string, userId: string) {
        const prisma = getPrisma();
        return await prisma.chatSession.delete({
            where: { id: sessionId, userId },
        });
    }
}

export default new ChatSessionService();
