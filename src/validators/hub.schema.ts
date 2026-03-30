import { z } from "zod";
import { HubPostStatus } from "../../generated/prisma/enums.js";

const hubStatusSchema = z.nativeEnum(HubPostStatus);

export const hubPostCreateSchema = z.object({
    title: z.string().trim().min(1).max(500),
    body: z.string().trim().min(1),
    categoryId: z.string().cuid().nullable().optional(),
    status: hubStatusSchema.optional(),
});

export const hubPostPatchSchema = z.object({
    title: z.string().trim().min(1).max(500).optional(),
    body: z.string().trim().min(1).optional(),
    categoryId: z.string().cuid().nullable().optional(),
    status: hubStatusSchema.optional(),
});

export const hubPublicListQuerySchema = z.object({
    q: z.string().optional(),
    categorySlug: z.string().optional(),
    sort: z.enum(["new", "updated"]).optional().default("new"),
    /** Lọc bài Hub đã xuất bản theo tác giả (hồ sơ công khai) */
    authorId: z.string().cuid().optional(),
    page: z.coerce.number().int().min(1).optional().default(1),
    pageSize: z.coerce.number().int().min(1).max(50).optional().default(12),
});

export const hubAdminListQuerySchema = hubPublicListQuerySchema.extend({
    status: hubStatusSchema.optional(),
});

export const hubAdminCreateSchema = hubPostCreateSchema.extend({
    authorId: z.string().cuid(),
    slug: z.string().trim().min(1).max(191).optional(),
});

export const hubAdminPatchSchema = hubPostPatchSchema.extend({
    slug: z.string().trim().min(1).max(191).optional(),
    authorId: z.string().cuid().optional(),
});

export const hubCommentCreateBodySchema = z.object({
    body: z.string().trim().min(1).max(10_000),
    parentId: z.string().cuid().nullable().optional(),
});

export const hubCommentPatchBodySchema = z.object({
    body: z.string().trim().min(1).max(10_000),
});
