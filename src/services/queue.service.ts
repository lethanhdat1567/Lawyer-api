import { QueueStatus } from "../../generated/prisma/enums.js";
import { getPrisma } from "../lib/prisma.js";

class QueueService {
    async findOnePending() {
        const prisma = await getPrisma();

        return prisma.queue.findFirst({
            where: {
                status: "pending",
            },
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
