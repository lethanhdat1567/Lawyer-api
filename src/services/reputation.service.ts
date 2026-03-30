import type { Prisma } from "../../generated/prisma/client.js";
import { ReputationReason, UserRole } from "../../generated/prisma/enums.js";
import { DELTA_BLOG_FIRST_PUBLISH } from "../constants/reputation.constants.js";
import { ErrorCode } from "../constants/errorCodes.js";
import { HttpStatus } from "../constants/httpStatus.js";
import { HttpError } from "../lib/httpError.js";
import { getPrisma } from "../lib/prisma.js";

export type ContributionTier = {
    code: string;
    labelVi: string;
};

/** Ngưỡng bậc đóng góp (điểm tích lũy). */
const TIER_THRESHOLDS: { min: number; tier: ContributionTier }[] = [
    { min: 5000, tier: { code: "exceptional", labelVi: "Kiện xuất" } },
    { min: 2000, tier: { code: "notable", labelVi: "Nổi bật" } },
    { min: 500, tier: { code: "active", labelVi: "Tích cực" } },
    { min: 100, tier: { code: "contributor", labelVi: "Đóng góp" } },
    { min: 1, tier: { code: "newcomer", labelVi: "Mới tham gia" } },
];

export function contributionTierFromScore(score: number): ContributionTier {
    for (const { min, tier } of TIER_THRESHOLDS) {
        if (score >= min) return tier;
    }
    return { code: "none", labelVi: "—" };
}

export type LeaderboardPublicItemDto = {
    rank: number;
    userId: string;
    score: number;
    contributorOptOut: boolean;
    tierCode: string;
    tierLabelVi: string;
    username: string | null;
    displayName: string | null;
    avatarUrl: string | null;
    isVerifiedLawyer: boolean;
};

export type LeaderboardPublicResultDto = {
    period: "all_time";
    items: LeaderboardPublicItemDto[];
};

export async function applyReputationDelta(input: {
    userId: string;
    delta: number;
    reason: ReputationReason;
    refHubCommentId?: string | null;
    refBlogPostId?: string | null;
    refBlogCommentId?: string | null;
}): Promise<{ score: number }> {
    const prisma = getPrisma();
    const user = await prisma.user.findFirst({
        where: { id: input.userId, deletedAt: null },
        select: { id: true },
    });
    if (!user) {
        throw new HttpError(
            HttpStatus.NOT_FOUND,
            "User not found",
            ErrorCode.NOT_FOUND,
        );
    }

    await prisma.$transaction(async (tx) => {
        await tx.reputationLedger.create({
            data: {
                userId: input.userId,
                delta: input.delta,
                reason: input.reason,
                refHubCommentId: input.refHubCommentId ?? null,
                refBlogPostId: input.refBlogPostId ?? null,
                refBlogCommentId: input.refBlogCommentId ?? null,
            },
        });
        await tx.userContributionScore.upsert({
            where: { userId: input.userId },
            create: { userId: input.userId, score: input.delta },
            update: { score: { increment: input.delta } },
        });
    });

    const row = await prisma.userContributionScore.findUnique({
        where: { userId: input.userId },
        select: { score: true },
    });
    const raw = row?.score ?? 0;
    if (raw < 0) {
        await prisma.userContributionScore.update({
            where: { userId: input.userId },
            data: { score: 0 },
        });
        return { score: 0 };
    }
    return { score: raw };
}

/** Thưởng xuất bản blog lần đầu (idempotent theo bài + tác giả tại thời điểm thưởng). */
export async function tryAwardBlogFirstPublish(
    authorId: string,
    blogPostId: string,
): Promise<void> {
    const prisma = getPrisma();
    const d = DELTA_BLOG_FIRST_PUBLISH;
    const already = await prisma.reputationLedger.findFirst({
        where: {
            userId: authorId,
            reason: ReputationReason.BLOG_QUALITY,
            refBlogPostId: blogPostId,
            delta: d,
        },
        select: { id: true },
    });
    if (already) return;
    await applyReputationDelta({
        userId: authorId,
        delta: d,
        reason: ReputationReason.BLOG_QUALITY,
        refBlogPostId: blogPostId,
    });
}

/** Thu hồi thưởng xuất bản khi chuyển PUBLISHED → DRAFT hoặc soft-delete (idempotent). */
export async function tryRevokeBlogFirstPublish(
    authorId: string,
    blogPostId: string,
): Promise<void> {
    const prisma = getPrisma();
    const d = DELTA_BLOG_FIRST_PUBLISH;
    const awarded = await prisma.reputationLedger.findFirst({
        where: {
            userId: authorId,
            reason: ReputationReason.BLOG_QUALITY,
            refBlogPostId: blogPostId,
            delta: d,
        },
        select: { id: true },
    });
    if (!awarded) return;
    const revoked = await prisma.reputationLedger.findFirst({
        where: {
            userId: authorId,
            reason: ReputationReason.BLOG_QUALITY,
            refBlogPostId: blogPostId,
            delta: -d,
        },
        select: { id: true },
    });
    if (revoked) return;
    await applyReputationDelta({
        userId: authorId,
        delta: -d,
        reason: ReputationReason.BLOG_QUALITY,
        refBlogPostId: blogPostId,
    });
}

export type AdminReputationLedgerItemDto = {
    id: string;
    userId: string;
    delta: number;
    reason: ReputationReason;
    refHubCommentId: string | null;
    refBlogPostId: string | null;
    refBlogCommentId: string | null;
    createdAt: string;
    username: string | null;
    email: string;
};

export async function listAdminReputationLedger(params: {
    skip: number;
    take: number;
    userId?: string;
}): Promise<{ items: AdminReputationLedgerItemDto[]; total: number }> {
    const prisma = getPrisma();
    const where: Prisma.ReputationLedgerWhereInput = {
        ...(params.userId ? { userId: params.userId } : {}),
    };
    const [total, rows] = await prisma.$transaction([
        prisma.reputationLedger.count({ where }),
        prisma.reputationLedger.findMany({
            where,
            orderBy: { createdAt: "desc" },
            skip: params.skip,
            take: params.take,
            include: {
                user: {
                    select: {
                        email: true,
                        profile: { select: { username: true } },
                    },
                },
            },
        }),
    ]);

    const items: AdminReputationLedgerItemDto[] = rows.map((r) => ({
        id: r.id,
        userId: r.userId,
        delta: r.delta,
        reason: r.reason,
        refHubCommentId: r.refHubCommentId,
        refBlogPostId: r.refBlogPostId,
        refBlogCommentId: r.refBlogCommentId,
        createdAt: r.createdAt.toISOString(),
        username: r.user.profile?.username ?? null,
        email: r.user.email,
    }));

    return { items, total };
}

export async function listPublicContributorsLeaderboard(params: {
    limit: number;
}): Promise<LeaderboardPublicResultDto> {
    const prisma = getPrisma();
    const where: Prisma.UserContributionScoreWhereInput = {
        score: { gt: 0 },
        user: {
            deletedAt: null,
            profile: {
                is: { deletedAt: null },
            },
        },
    };

    const rows = await prisma.userContributionScore.findMany({
        where,
        orderBy: { score: "desc" },
        take: params.limit,
        include: {
            user: {
                include: { profile: true },
            },
        },
    });

    const items: LeaderboardPublicItemDto[] = rows.map((row, index) => {
        const p = row.user.profile;
        const tier = contributionTierFromScore(row.score);
        const optOut = p?.contributorOptOut ?? false;
        const isVerifiedLawyer = row.user.role === UserRole.VERIFIED_LAWYER;

        return {
            rank: index + 1,
            userId: row.userId,
            score: row.score,
            contributorOptOut: optOut,
            tierCode: tier.code,
            tierLabelVi: tier.labelVi,
            username: optOut ? null : (p?.username ?? null),
            displayName: optOut ? null : (p?.displayName ?? null),
            avatarUrl: optOut ? null : (p?.avatarUrl ?? null),
            isVerifiedLawyer: optOut ? false : isVerifiedLawyer,
        };
    });

    return { period: "all_time", items };
}
