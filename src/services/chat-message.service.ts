import { Role } from "../../generated/prisma/enums.js";
import { getPrisma } from "../lib/prisma.js";

class ChatMessageService {
    async countMessagesBySessionId(sessionId: string) {
        const prisma = getPrisma();

        const count = await prisma.chatMessage.count({
            where: {
                sessionId,
            },
        });

        return count;
    }

    async createMessage(sessionId: string, message: string, role: Role) {
        const prisma = getPrisma();
        return await prisma.chatMessage.create({
            data: {
                sessionId,
                content: message,
                role,
            },
        });
    }
}

export default new ChatMessageService();
