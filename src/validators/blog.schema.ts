import { z } from "zod";
import { BlogPostStatus } from "../../generated/prisma/enums.js";

const blogStatusSchema = z.nativeEnum(BlogPostStatus);

function blogThumbnailOk(v: string): boolean {
    const s = v.trim();
    if (!s) return false;
    return s.startsWith("/upload/") || /^https?:\/\//i.test(s);
}

const optionalThumbnail = z.preprocess(
    (x) => {
        if (x === "" || x === undefined) return undefined;
        if (x === null) return null;
        return x;
    },
    z
        .union([z.string().max(2048), z.null()])
        .optional()
        .superRefine((val, ctx) => {
            if (typeof val === "string" && !blogThumbnailOk(val)) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: "thumbnailUrl must be /upload/... or http(s) URL",
                });
            }
        }),
);

export const blogPublicListQuerySchema = z.object({
    q: z.string().optional(),
    tagSlug: z.string().optional(),
    sort: z.enum(["new", "updated"]).optional().default("new"),
    verifiedOnly: z.preprocess((x) => {
        if (x === true || x === "true" || x === "1") return true;
        return false;
    }, z.boolean()),
    /** Lọc bài đã xuất bản theo tác giả (hồ sơ công khai /users/...) */
    authorId: z.string().cuid().optional(),
    page: z.coerce.number().int().min(1).optional().default(1),
    pageSize: z.coerce.number().int().min(1).max(50).optional().default(12),
});

export const blogMeCreateSchema = z.object({
    title: z.string().trim().min(1).max(500),
    body: z.string().trim().min(1),
    excerpt: z.string().trim().max(5000).nullable().optional(),
    thumbnailUrl: optionalThumbnail,
    status: blogStatusSchema.optional(),
    slug: z.string().trim().min(1).max(191).optional(),
    tagIds: z.array(z.string().cuid()).optional(),
});

export const blogMePatchSchema = z.object({
    title: z.string().trim().min(1).max(500).optional(),
    body: z.string().trim().min(1).optional(),
    excerpt: z.string().trim().max(5000).nullable().optional(),
    thumbnailUrl: optionalThumbnail,
    status: blogStatusSchema.optional(),
    slug: z.string().trim().min(1).max(191).optional(),
    tagIds: z.array(z.string().cuid()).optional(),
});

export const blogCommentCreateBodySchema = z.object({
    body: z.string().trim().min(1).max(10_000),
    parentId: z.string().cuid().nullable().optional(),
});

export const blogCommentPatchBodySchema = z.object({
    body: z.string().trim().min(1).max(10_000),
});

export const blogAdminListQuerySchema = blogPublicListQuerySchema.extend({
    status: blogStatusSchema.optional(),
});

export const blogAdminCreateSchema = blogMeCreateSchema.extend({
    authorId: z.string().cuid(),
});

export const blogAdminPatchSchema = blogMePatchSchema.extend({
    authorId: z.string().cuid().optional(),
    isVerified: z.boolean().optional(),
    verificationNotes: z.string().max(10000).nullable().optional(),
    legalCorpusVersion: z.string().max(191).nullable().optional(),
});
