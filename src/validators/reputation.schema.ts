import { z } from "zod";
import { ReputationReason } from "../../generated/prisma/enums.js";

export const contributorsLeaderboardQuerySchema = z.object({
  limit: z.coerce.number().int().min(1).max(100).optional().default(50),
});

export const adminReputationAdjustBodySchema = z
  .object({
    userId: z.string().cuid(),
    delta: z.number().int(),
    reason: z.nativeEnum(ReputationReason),
    refHubCommentId: z.string().cuid().nullable().optional(),
    refBlogPostId: z.string().cuid().nullable().optional(),
    refBlogCommentId: z.string().cuid().nullable().optional(),
  })
  .superRefine((data, ctx) => {
    const adminOnly =
      data.reason === ReputationReason.ADMIN_BONUS ||
      data.reason === ReputationReason.ADMIN_PENALTY;
    if (adminOnly) {
      if (data.refHubCommentId != null) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Refs must be empty for admin bonus/penalty",
          path: ["refHubCommentId"],
        });
      }
      if (data.refBlogPostId != null) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Refs must be empty for admin bonus/penalty",
          path: ["refBlogPostId"],
        });
      }
      if (data.refBlogCommentId != null) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Refs must be empty for admin bonus/penalty",
          path: ["refBlogCommentId"],
        });
      }
    }
  });

export const adminReputationLedgerQuerySchema = z.object({
  page: z.coerce.number().int().min(1).optional().default(1),
  pageSize: z.coerce.number().int().min(1).max(50).optional().default(20),
  userId: z.string().cuid().optional(),
});
