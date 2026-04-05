import { getPrisma } from "../lib/prisma.js";

class AiConfigService {
    private readonly CONFIG_ID = 1;

    async getConfig() {
        const prisma = getPrisma();

        const config = await prisma.aiConfig.upsert({
            where: { id: this.CONFIG_ID },
            update: {},
            create: {
                id: this.CONFIG_ID,
                advisor_prompt: "Bạn là luật sư tư vấn chuyên nghiệp...",
                community_prompt: "Bạn là chuyên gia hỗ trợ cộng đồng...",
                blog_prompt: "Bạn là chuyên gia viết blog pháp luật...",
            },
        });

        return config;
    }

    async updateConfig(data: { advisor_prompt?: string; community_prompt?: string; blog_prompt?: string }) {
        const prisma = getPrisma();

        return await prisma.aiConfig.update({
            where: { id: this.CONFIG_ID },
            data: {
                ...data,
            },
        });
    }

    async getPromptByType(type: "advisor" | "community" | "blog"): Promise<string> {
        const config = await this.getConfig();

        switch (type) {
            case "advisor":
                return config.advisor_prompt;
            case "community":
                return config.community_prompt;
            case "blog":
                return config.blog_prompt;
            default:
                return "";
        }
    }
}

export default new AiConfigService();
