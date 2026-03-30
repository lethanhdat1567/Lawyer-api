import { z } from "zod";
import {
    CrawlLogStatus,
    LawyerVerificationStatus,
    ReportStatus,
    TaskType,
    UserRole,
} from "../../generated/prisma/enums.js";

export const adminStatsQuerySchema = z.object({});

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

export const adminReportsListQuerySchema = z.object({
    page: z.coerce.number().int().min(1).optional().default(1),
    pageSize: z.coerce.number().int().min(1).max(100).optional().default(20),
    status: z.nativeEnum(ReportStatus).optional(),
});

export const adminPatchReportBodySchema = z.object({
    status: z.enum([ReportStatus.ACTIONED, ReportStatus.DISMISSED]),
});

export const adminLeaderboardQuerySchema = z.object({
    limit: z.coerce.number().int().min(1).max(500).optional().default(100),
    offset: z.coerce.number().int().min(0).optional().default(0),
});

export const adminLegalSourcesQuerySchema = z.object({
    page: z.coerce.number().int().min(1).optional().default(1),
    pageSize: z.coerce.number().int().min(1).max(100).optional().default(20),
    q: z.string().optional(),
});

export const adminCreateLegalSourceBodySchema = z.object({
    title: z.string().min(1).max(500),
    sourceUrl: z.string().max(2048).nullable().optional(),
    jurisdiction: z.string().max(200).nullable().optional(),
    effectiveFrom: z.coerce.date().nullable().optional(),
    effectiveTo: z.coerce.date().nullable().optional(),
});

export const adminPatchLegalSourceBodySchema = z
    .object({
        title: z.string().min(1).max(500).optional(),
        sourceUrl: z.string().max(2048).nullable().optional(),
        jurisdiction: z.string().max(200).nullable().optional(),
        effectiveFrom: z.coerce.date().nullable().optional(),
        effectiveTo: z.coerce.date().nullable().optional(),
    })
    .refine((o) => Object.keys(o).length > 0, {
        message: "At least one field required",
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

export const adminCrawlDraftBodySchema = z.object({
    url: z.string().url().max(2048),
    overrides: z
        .record(z.nativeEnum(TaskType), adminTaskOverrideSchema)
        .optional(),
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
    desiredStatus: z
        .enum([CrawlLogStatus.SUCCESS, CrawlLogStatus.FAILED])
        .optional()
        .default(CrawlLogStatus.SUCCESS),
});
