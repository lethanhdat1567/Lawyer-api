import { FeedbackStatus } from "../../generated/prisma/enums.js";
import { getPrisma } from "../lib/prisma.js";
import aiService from "./ai.service.js";

class HubFeedbackService {
    async findPublicHubById(hubId: string) {
        const prisma = getPrisma();

        return await prisma.hubPost.findFirst({
            where: { id: hubId, deletedAt: null, status: "PUBLISHED" },
        });
    }

    async createFeedback(hubId: string, content?: string) {
        const prisma = getPrisma();

        const result = await aiService.generateGoogleText(
            `
                Bạn là Luật sư tư vấn cao cấp. Hãy phân tích vấn đề sau và trả về phản hồi ngắn gọn bằng định dạng Markdown.

                ---
                VẤN ĐỀ: ${content}
                ---

                YÊU CẦU NỘI DUNG:
                1. **Phân loại**: Xác định loại luật (Dân sự, Hình sự, Đất đai...).
                2. **Đánh giá**: 1 câu nhận định tình hình.
                3. **Rủi ro**: Thấp/Trung bình/Cao.
                4. **Giải pháp**: Tối đa 3 bước hành động cụ thể.
                5. **Lưu ý**: 1 lưu ý quan trọng nhất.

                YÊU CẦU ĐỊNH DẠNG:
                - Chỉ trả về Markdown thuần túy.
                - Sử dụng các header (###), list (-) và bold (**).
                - Không bao gồm bất kỳ giải thích nào khác ngoài nội dung tư vấn.
`,
        );

        try {
            await prisma.hubFeedback.create({
                data: {
                    hubId,
                    rawResponse: result,
                    status: "COMPLETED",
                },
            });
        } catch (error) {
            console.log(error);
            await prisma.hubFeedback.create({
                data: {
                    hubId,
                    status: "FAILED",
                },
            });
        }
    }
}

export default new HubFeedbackService();
