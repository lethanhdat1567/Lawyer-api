import { QueueStatus } from "../../generated/prisma/enums.js";
import {
    AI_EMBEDDING_QUEUE,
    AI_FEEDBACK_QUEUE,
    FORGOT_PASSWORD_QUEUE,
    VERIFY_EMAIL_QUEUE,
} from "../constants/queue.js";
import { getPrisma } from "../lib/prisma.js";

class QueueService {
    async findOnePending() {
        const prisma = await getPrisma();
        const highPriorityJob = await prisma.queue.findFirst({
            where: {
                status: "pending",
                type: { in: [VERIFY_EMAIL_QUEUE, FORGOT_PASSWORD_QUEUE, AI_FEEDBACK_QUEUE] },
            },
            orderBy: { createdAt: "asc" },
        });

        if (highPriorityJob) return highPriorityJob;

        return await prisma.queue.findFirst({
            where: {
                status: "pending",
                type: AI_EMBEDDING_QUEUE,
            },
            orderBy: { createdAt: "asc" },
        });
    }

    async push(type: string, payload: any) {
        const prisma = await getPrisma();

        return await prisma.queue.create({
            data: {
                type,
                payload,
                status: "pending",
            },
        });
    }

    async updateStatus(id: string, status: QueueStatus) {
        const prisma = await getPrisma();

        return await prisma.queue.update({
            where: { id },
            data: { status },
        });
    }
}

export const queueService = new QueueService();
