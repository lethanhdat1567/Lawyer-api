import { z } from "zod";
import { CrawlLogStatus, LawyerVerificationStatus, UserRole } from "../../generated/prisma/enums.js";

export const adminDashboardRangeSchema = z.enum(["7d", "30d", "3m"]);

export const adminDashboardGranularitySchema = z.enum(["day"]);

export const adminStatsQuerySchema = z.object({
    range: adminDashboardRangeSchema.optional().default("30d"),
    granularity: adminDashboardGranularitySchema.optional().default("day"),
});

export const adminUsersListQuerySchema = z.object({
    page: z.coerce.number().int().min(1).optional().default(1),
    pageSize: z.coerce.number().int().min(1).max(100).optional().default(20),
    q: z.string().optional(),
    role: z.nativeEnum(UserRole).optional(),
});

export const adminPatchUserBodySchema = z.object({
    role: z.nativeEnum(UserRole),
});

export const adminLawyerVerificationsQuerySchema = z.object({
    page: z.coerce.number().int().min(1).optional().default(1),
    pageSize: z.coerce.number().int().min(1).max(100).optional().default(20),
    status: z.nativeEnum(LawyerVerificationStatus).optional(),
});

export const adminPatchLawyerVerificationBodySchema = z.object({
    status: z.enum([
        LawyerVerificationStatus.APPROVED,
        LawyerVerificationStatus.REJECTED,
        LawyerVerificationStatus.REVOKED,
    ]),
    note: z.string().max(10_000).optional(),
});

export const adminLeaderboardQuerySchema = z.object({
    limit: z.coerce.number().int().min(1).max(500).optional().default(100),
    offset: z.coerce.number().int().min(0).optional().default(0),
});

const adminTaskOverrideSchema = z
    .object({
        modelName: z.string().min(1).max(200).optional(),
        promptName: z.string().min(1).max(200).optional(),
        promptContent: z.string().min(1).max(50_000).optional(),
    })
    .refine((o) => Object.keys(o).length > 0, {
        message: "At least one override field required",
    });

export const adminCrawlApproveBodySchema = z.object({
    crawlLogId: z.string().min(1),
    url: z.string().url().max(2048),
    markdownDraft: z.string().min(1).max(200_000),
    category: z.string().min(1).max(500).nullable().optional(),
    metadata: z.object({
        chapter: z.string().max(500).nullable().optional(),
        article: z.string().max(500).nullable().optional(),
        tags: z.array(z.string().min(1).max(120)).max(100).default([]),
        summary: z.string().max(10_000).nullable().optional(),
    }),
    desiredStatus: z.enum([CrawlLogStatus.SUCCESS, CrawlLogStatus.FAILED]).optional().default(CrawlLogStatus.SUCCESS),
});
