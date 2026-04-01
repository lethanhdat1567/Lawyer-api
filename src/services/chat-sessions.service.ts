import { getPrisma } from "../lib/prisma.js";

class ChatSessionService {
    async getSessions(userId: string, search?: string) {
        const prisma = getPrisma();
        const normalizedSearch = search?.trim();

        return await prisma.chatSession.findMany({
            where: {
                userId,
                ...(normalizedSearch
                    ? {
                          title: {
                              contains: normalizedSearch,
                          },
                      }
                    : {}),
            },
            orderBy: { updatedAt: "desc" },
            select: {
                id: true,
                title: true,
                createdAt: true,
                updatedAt: true,
            },
        });
    }

    async getOwnedSession(sessionId: string, userId: string) {
        const prisma = getPrisma();
        return await prisma.chatSession.findFirst({
            where: { id: sessionId, userId },
            select: {
                id: true,
                userId: true,
                title: true,
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
        const session = await this.getOwnedSession(sessionId, userId);

        if (!session) {
            return null;
        }

        return await prisma.chatSession.update({
            where: { id: session.id },
            data: { title },
        });
    }

    async deleteSession(sessionId: string, userId: string) {
        const prisma = getPrisma();
        const session = await this.getOwnedSession(sessionId, userId);

        if (!session) {
            return null;
        }

        return await prisma.chatSession.delete({
            where: { id: session.id },
        });
    }
}

export default new ChatSessionService();
