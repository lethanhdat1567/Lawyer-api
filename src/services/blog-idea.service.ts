import { IdeaStatus } from "../../generated/prisma/client.js";
import { getPrisma } from "../lib/prisma.js";
import aiService from "./ai.service.js";

class BlogIdeaService {
    async listIdeas(status?: IdeaStatus) {
        const prisma = getPrisma();
        const ideas = await prisma.blogIdea.findMany({
            where: {
                status: status,
            },
            orderBy: {
                createdAt: "desc",
            },
        });
        return ideas;
    }
    async createWithQuantity(quantity: number, prompt: string) {
        const prisma = getPrisma();

        if (!quantity || !prompt) {
            return ["Field required", null];
        }

        const existingIdeas = await prisma.blogIdea.findMany();
        const existingNames = existingIdeas.map((i) => i.name).join(", ");

        const result = await aiService.generateGoogleText(`
            Nhiệm vụ: Tạo danh sách ý tưởng blog luật.
            Chủ đề: ${prompt}
            Số lượng: ${quantity}

            DANH SÁCH ĐÃ CÓ (TUYỆT ĐỐI KHÔNG TRÙNG HOẶC TƯƠNG TỰ):
            [${existingNames}]

            YÊU CẦU ĐỊNH DẠNG (BẮT BUỘC):
            1. Chỉ trả về một JSON array duy nhất theo cấu trúc: [{"name": "...", "description": "..."}]
            2. KHÔNG bao gồm markdown, không có \`\`\`json, không có text giải thích trước hoặc sau JSON.
            3. Phải đảm bảo thuộc tính JSON nằm trong dấu ngoặc kép đôi đúng chuẩn.
            4. Phải trả về dữ liệu thô (raw string) bắt đầu bằng [ và kết thúc bằng ].
        `);

        const ideas = JSON.parse(result);

        await prisma.blogIdea.createMany({
            data: ideas,
        });

        return [null, "Create successfully"];
    }

    async destroy(id: number) {
        const prisma = getPrisma();

        return await prisma.blogIdea.delete({
            where: { id },
        });
    }
}

export default new BlogIdeaService();
