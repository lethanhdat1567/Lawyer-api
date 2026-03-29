import { z } from "zod";
import {
  LawyerVerificationStatus,
  ReportStatus,
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
