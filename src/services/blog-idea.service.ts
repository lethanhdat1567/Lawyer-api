import { IdeaStatus } from "../../generated/prisma/client.js";
import { parseJsonArray } from "../lib/aiResponseParse.js";
import { getPrisma } from "../lib/prisma.js";
import aiService from "./ai.service.js";

const IDEA_NAME_MAX = 500;
const IDEA_DESCRIPTION_MAX = 8000;

class BlogIdeaService {
    async listIdeas(status?: IdeaStatus) {
        const prisma = getPrisma();
        const ideas = await prisma.blogIdea.findMany({
            where: status === undefined ? {} : { status },
            orderBy: {
                createdAt: "desc",
            },
        });
        return ideas;
    }
    async createWithQuantity(quantity: number) {
        const prisma = getPrisma();

        if (!Number.isFinite(quantity) || !Number.isInteger(quantity) || quantity < 1) {
            return ["Số lượng phải là số nguyên dương.", null];
        }

        const system = await prisma.scheduleBlogSystem.findFirst({
            select: {
                model: true,
                prompt: true,
            },
        });

        if (!system) {
            return ["Chưa có cấu hình lịch hệ thống. Hãy tạo bản ghi schedule và lưu model cùng prompt.", null];
        }

        const model = system.model?.trim();
        const prompt = system.prompt?.trim();
        if (!model || !prompt) {
            return ["Cần cấu hình model và prompt trong phần lịch hệ thống trước khi tạo ý tưởng.", null];
        }

        try {
            const existingIdeas = await prisma.blogIdea.findMany();
            const existingNames = existingIdeas.map((i) => i.name).join(", ");
            const tagsFromDb = await prisma.tag.findMany({ select: { name: true } });

            const result = await aiService.generateText(
                `
            Nhiệm vụ: Tạo danh sách ý tưởng blog luật.
            ${prompt}
            Số lượng: ${quantity}

            DANH SÁCH ĐÃ CÓ (TUYỆT ĐỐI KHÔNG TẠO TRÙNG HOẶC TƯƠNG TỰ):
            [${existingNames}]
            DANH SÁCH TAGS HỆ THỐNG (DỰA VÀO TAGS MÀ TẠO Ý TƯỞNG LIÊN QUAN): [${tagsFromDb.map((t) => t.name).join(", ")}]

            YÊU CẦU ĐỊNH DẠNG (BẮT BUỘC):
            1. Chỉ trả về một JSON array duy nhất theo cấu trúc: [{"name": "...", "description": "..."}]
            2. KHÔNG bao gồm markdown, không có \`\`\`json, không có text giải thích trước hoặc sau JSON.
            3. Phải đảm bảo thuộc tính JSON nằm trong dấu ngoặc kép đôi đúng chuẩn.
            4. Phải trả về dữ liệu thô (raw string) bắt đầu bằng [ và kết thúc bằng ].
            - TUYỆT ĐỐI KHÔNG sử dụng dấu ngoặc kép đôi (") bên trong các giá trị name và description. Nếu cần nhấn mạnh, hãy sử dụng dấu ngoặc đơn (') hoặc viết thường.
        `,
                model,
            );

            const parsed = parseJsonArray<unknown>(result);
            if (!parsed.ok) {
                return [parsed.error, null];
            }

            const rows: { name: string; description: string }[] = [];
            for (const item of parsed.value) {
                if (item === null || typeof item !== "object" || Array.isArray(item)) {
                    continue;
                }
                const o = item as Record<string, unknown>;
                const name = typeof o.name === "string" ? o.name.trim() : "";
                const description = typeof o.description === "string" ? o.description.trim() : "";
                if (!name || !description) {
                    continue;
                }

                rows.push({
                    name: name.slice(0, IDEA_NAME_MAX),
                    description: description.slice(0, IDEA_DESCRIPTION_MAX),
                });
            }

            const trimmed = rows.slice(0, quantity);
            if (trimmed.length === 0) {
                return ["AI không trả về mảng ý tưởng hợp lệ (name và description không rỗng).", null];
            }

            await prisma.blogIdea.createMany({
                data: trimmed,
            });

            return [null, "Create successfully"];
        } catch (error) {
            console.error("BlogIdeaService.createWithQuantity:", error);
            return [
                error instanceof Error ? error.message : "Không tạo được ý tưởng (lỗi AI hoặc cơ sở dữ liệu).",
                null,
            ];
        }
    }

    async destroy(id: number) {
        const prisma = getPrisma();

        return await prisma.blogIdea.delete({
            where: { id },
        });
    }
}

export default new BlogIdeaService();
