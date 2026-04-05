import { getPrisma } from "../lib/prisma.js";

class BlogScheduleService {
    async getSchedule() {
        const prisma = getPrisma();
        return prisma.scheduleBlogSystem.findFirst({
            orderBy: { updatedAt: "desc" },
        });
    }

    async toggleSchedule(id: string) {
        const prisma = getPrisma();

        if (!id) return ["Schedule not found", null];

        const current = await prisma.scheduleBlogSystem.findUnique({
            where: { id },
            select: { isActive: true },
        });

        if (!current) return ["Schedule not found", null];

        const updateData = await prisma.scheduleBlogSystem.update({
            where: { id },
            data: {
                isActive: !current.isActive,
            },
        });

        return [null, { isActive: updateData.isActive }];
    }

    async updateSchedule(id: string, body: { model?: string; prompt?: string }) {
        const prisma = getPrisma();

        const updateData = await prisma.scheduleBlogSystem.update({
            where: { id },
            data: {
                model: body.model,
                prompt: body.prompt,
            },
        });

        return updateData;
    }
}

export default new BlogScheduleService();
