import type { Prisma } from "../../../generated/prisma/client.js";
import { UserRole } from "../../../generated/prisma/enums.js";
import { getPrisma } from "../../lib/prisma.js";
import { contributionTierFromScore } from "../reputation.service.js";

export type AdminLeaderboardItemDto = {
    rank: number;
    userId: string;
    email: string;
    score: number;
    username: string | null;
    displayName: string | null;
    avatarUrl: string | null;
    userRole: UserRole;
    tierCode: string;
    tierLabelVi: string;
};

class AdminLeaderboardService {
    async listLeaderboard(params: {
        limit: number;
        offset: number;
    }): Promise<{ items: AdminLeaderboardItemDto[]; total: number }> {
        const prisma = getPrisma();
        const where: Prisma.UserContributionScoreWhereInput = {};

        const total = await prisma.userContributionScore.count({ where });
        const rows = await prisma.userContributionScore.findMany({
            where,
            orderBy: { score: "desc" },
            skip: params.offset,
            take: params.limit,
            include: { user: { include: { profile: true } } },
        });

        const items: AdminLeaderboardItemDto[] = rows.map((row, index) => {
            const p = row.user.profile;
            const tier = contributionTierFromScore(row.score);
            return {
                rank: params.offset + index + 1,
                userId: row.userId,
                email: row.user.email,
                score: row.score,
                username: p?.username ?? null,
                displayName: p?.displayName ?? null,
                avatarUrl: p?.avatarUrl ?? null,
                userRole: row.user.role,
                tierCode: tier.code,
                tierLabelVi: tier.labelVi,
            };
        });

        return { items, total };
    }
}

export default new AdminLeaderboardService();
