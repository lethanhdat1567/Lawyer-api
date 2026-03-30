import { BlogPostStatus, LawyerVerificationStatus, ReportStatus } from "../../../generated/prisma/enums.js";
import { getPrisma } from "../../lib/prisma.js";

export type AdminStatsDto = {
    usersTotal: number;
    lawyerVerificationsPending: number;
    reportsOpen: number;
    hubPostsTotal: number;
    hubCommentsTotal: number;
    blogPostsPublished: number;
    assistantMessagesTotal: number;
};

class AdminStatsService {
    async getStats(): Promise<AdminStatsDto> {
        const prisma = getPrisma();
        const userWhereActive = { deletedAt: null };

        const [
            userCount,
            pendingVerifications,
            openReports,
            hubPostCount,
            hubCommentCount,
            blogPublishedCount,
            assistantMessageCount,
        ] = await Promise.all([
            prisma.user.count({ where: userWhereActive }),
            prisma.lawyerVerification.count({
                where: {
                    status: LawyerVerificationStatus.PENDING,
                    deletedAt: null,
                },
            }),
            prisma.report.count({ where: { status: ReportStatus.OPEN } }),
            prisma.hubPost.count({ where: { deletedAt: null } }),
            prisma.hubComment.count({ where: { deletedAt: null } }),
            prisma.blogPost.count({
                where: { deletedAt: null, status: BlogPostStatus.PUBLISHED },
            }),
            prisma.assistantMessage.count(),
        ]);

        return {
            usersTotal: userCount,
            lawyerVerificationsPending: pendingVerifications,
            reportsOpen: openReports,
            hubPostsTotal: hubPostCount,
            hubCommentsTotal: hubCommentCount,
            blogPostsPublished: blogPublishedCount,
            assistantMessagesTotal: assistantMessageCount,
        };
    }
}

export default new AdminStatsService();
