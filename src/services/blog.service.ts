import type { BlogComment, BlogPost, Profile, Tag, User } from "../../generated/prisma/client.js";
import { BlogPostStatus, ReputationReason } from "../../generated/prisma/enums.js";
import { ErrorCode } from "../constants/errorCodes.js";
import { HttpStatus } from "../constants/httpStatus.js";
import { ERROR_MESSAGES } from "../constants/messages.js";
import { DELTA_BLOG_POST_LIKED } from "../constants/reputation.constants.js";
import { normalizeTagSlug, parseJsonObject, sanitizeOptionalUrl } from "../lib/aiResponseParse.js";
import { HttpError } from "../lib/httpError.js";
import { normalizeBlogBodyHtml } from "../lib/normalizeBlogBodyHtml.js";
import { getPrisma } from "../lib/prisma.js";
import { applyReputationDelta, awardPublishedBlogScore, revokePublishedBlogScore } from "./reputation.service.js";
import { slugifyTitle } from "./hub.service.js";
import aiConfigService from "./ai-config.service.js";
import aiService from "./ai.service.js";

const EXCERPT_LEN = 180;
const BLOG_COMMENT_MAX_DEPTH = 4;

export interface BlogTagDto {
    id: string;
    slug: string;
    name: string;
}

export interface BlogAuthorDto {
    id: string;
    username: string;
    displayName: string | null;
    avatarUrl: string | null;
}

export interface BlogCommentDto {
    id: string;
    blogPostId: string;
    parentId: string | null;
    authorId: string;
    body: string;
    createdAt: string;
    likeCount: number;
    author: BlogAuthorDto;
}

export interface BlogPostListItemDto {
    id: string;
    slug: string;
    title: string;
    thumbnailUrl: string | null;
    excerpt: string;
    status: BlogPostStatus;
    isVerified: boolean;
    tags: BlogTagDto[];
    author: BlogAuthorDto;
    createdAt: string;
    updatedAt: string;
    commentCount: number;
    likeCount: number;
}

export interface BlogPostDetailDto extends BlogPostListItemDto {
    body: string;
    verifiedAt: string | null;
    verificationNotes: string | null;
    legalCorpusVersion: string | null;
    comments: BlogCommentDto[];
    savedCount: number;
}

function toIso(d: Date): string {
    return d.toISOString();
}

function excerptFromBody(body: string): string {
    const flat = body
        .replace(/<[^>]*>/g, " ")
        .replace(/\*\*([^*]+)\*\*/g, "$1")
        .replace(/\s+/g, " ")
        .trim();
    if (flat.length <= EXCERPT_LEN) return flat;
    return `${flat.slice(0, EXCERPT_LEN).trim()}…`;
}

async function blogCommentDepthFromRoot(commentId: string): Promise<number> {
    const prisma = getPrisma();
    let depth = 0;
    let curId: string | null = commentId;
    const seen = new Set<string>();
    while (curId) {
        if (seen.has(curId)) return -1;
        seen.add(curId);
        const row: { parentId: string | null } | null = await prisma.blogComment.findFirst({
            where: { id: curId },
            select: { parentId: true },
        });
        if (!row) return -1;
        if (!row.parentId) return depth;
        depth += 1;
        curId = row.parentId;
        if (depth > 64) return -1;
    }
    return -1;
}

async function allocateUniqueBlogSlug(base: string, excludePostId?: string): Promise<string> {
    const prisma = getPrisma();
    let n = 0;
    for (;;) {
        const candidate = n === 0 ? base : `${base}-${n}`;
        const existing = await prisma.blogPost.findFirst({
            where: {
                slug: candidate,
                ...(excludePostId ? { NOT: { id: excludePostId } } : {}),
            },
            select: { id: true },
        });
        if (!existing) return candidate;
        n += 1;
    }
}

function mapAuthor(user: User & { profile: Profile | null }): BlogAuthorDto {
    const p = user.profile;
    return {
        id: user.id,
        username: p?.username ?? user.email.split("@")[0] ?? "user",
        displayName: p?.displayName ?? null,
        avatarUrl: p?.avatarUrl ?? null,
    };
}

function mapTags(rows: { tag: Tag }[]): BlogTagDto[] {
    return rows.map((r) => ({
        id: r.tag.id,
        slug: r.tag.slug,
        name: r.tag.name,
    }));
}

function mapTag(tag: Tag): BlogTagDto {
    return {
        id: tag.id,
        slug: tag.slug,
        name: tag.name,
    };
}

async function getBlogTagById(tagId: string): Promise<Tag | null> {
    const prisma = getPrisma();
    return prisma.tag.findFirst({
        where: { id: tagId },
    });
}

async function getBlogTagBySlug(slug: string, excludeId?: string): Promise<Tag | null> {
    const prisma = getPrisma();
    return prisma.tag.findFirst({
        where: {
            slug,
            ...(excludeId ? { NOT: { id: excludeId } } : {}),
        },
    });
}

type BlogPostRowList = BlogPost & {
    author: User & { profile: Profile | null };
    tags: { tag: Tag }[];
    _count: {
        comments: number;
        likes: number;
    };
};

type BlogCommentAuthorRow = BlogComment & {
    author: User & { profile: Profile | null };
    _count: { likes: number };
};

function mapBlogCommentRowToDto(c: BlogCommentAuthorRow): BlogCommentDto {
    return {
        id: c.id,
        blogPostId: c.blogPostId,
        parentId: c.parentId,
        authorId: c.authorId,
        body: c.body,
        createdAt: toIso(c.createdAt),
        likeCount: c._count.likes,
        author: mapAuthor(c.author),
    };
}

type BlogPostRowDetail = BlogPost & {
    author: User & { profile: Profile | null };
    tags: { tag: Tag }[];
    comments: BlogCommentAuthorRow[];
    _count: {
        comments: number;
        likes: number;
        savedBy: number;
    };
};

function mapPostListItem(p: BlogPostRowList): BlogPostListItemDto {
    const excerpt = (p.excerpt?.trim() ? p.excerpt : excerptFromBody(p.body)) ?? "";
    return {
        id: p.id,
        slug: p.slug,
        title: p.title,
        thumbnailUrl: p.thumbnailUrl ?? null,
        excerpt,
        status: p.status,
        isVerified: p.isVerified,
        tags: mapTags(p.tags),
        author: mapAuthor(p.author),
        createdAt: toIso(p.createdAt),
        updatedAt: toIso(p.updatedAt),
        commentCount: p._count.comments,
        likeCount: p._count.likes,
    };
}

function mapPostDetail(p: BlogPostRowDetail): BlogPostDetailDto {
    const comments: BlogCommentDto[] = p.comments.map((c) => mapBlogCommentRowToDto(c));
    const listRow = {
        ...p,
        _count: { comments: p._count.comments, likes: p._count.likes },
    } as BlogPostRowList;
    return {
        ...mapPostListItem(listRow),
        body: normalizeBlogBodyHtml(p.body),
        verifiedAt: p.verifiedAt ? toIso(p.verifiedAt) : null,
        verificationNotes: p.verificationNotes ?? null,
        legalCorpusVersion: p.legalCorpusVersion ?? null,
        comments,
        savedCount: p._count.savedBy,
    };
}

const blogPostIncludeList = {
    author: { include: { profile: true } },
    tags: { include: { tag: true } },
} as const;

const blogPostIncludeListWithCounts = {
    ...blogPostIncludeList,
    _count: {
        select: {
            comments: true,
            likes: true,
        },
    },
} as const;

const blogPostIncludeDetail = {
    ...blogPostIncludeList,
    comments: {
        orderBy: { createdAt: "asc" as const },
        include: {
            author: { include: { profile: true } },
            _count: { select: { likes: true } },
        },
    },
    _count: {
        select: {
            comments: true,
            likes: true,
            savedBy: true,
        },
    },
} as const;

async function assertTagIdsExist(tagIds: string[]): Promise<void> {
    if (tagIds.length === 0) return;
    const unique = [...new Set(tagIds)];
    const prisma = getPrisma();
    const n = await prisma.tag.count({
        where: { id: { in: unique } },
    });
    if (n !== unique.length) {
        throw new HttpError(HttpStatus.BAD_REQUEST, "One or more tags not found", ErrorCode.VALIDATION_ERROR);
    }
}

async function replaceBlogPostTags(postId: string, tagIds: string[] | undefined) {
    if (tagIds === undefined) return;
    const prisma = getPrisma();
    const unique = [...new Set(tagIds)];
    await assertTagIdsExist(unique);
    await prisma.$transaction([
        prisma.blogPostTag.deleteMany({ where: { blogPostId: postId } }),
        ...(unique.length
            ? [
                  prisma.blogPostTag.createMany({
                      data: unique.map((tagId) => ({
                          blogPostId: postId,
                          tagId,
                      })),
                  }),
              ]
            : []),
    ]);
}

async function getBlogPostLikeCount(postId: string): Promise<number> {
    const prisma = getPrisma();
    return prisma.blogPostLike.count({ where: { blogPostId: postId } });
}

export async function listPublicBlogTags(): Promise<BlogTagDto[]> {
    const prisma = getPrisma();
    const rows = await prisma.tag.findMany({
        orderBy: [{ name: "asc" }],
    });
    return rows.map(mapTag);
}

export async function adminCreateBlogTag(input: { name: string; slug?: string }): Promise<BlogTagDto> {
    const prisma = getPrisma();
    const name = input.name.trim();
    const requestedSlug = input.slug?.trim();
    const slug = requestedSlug || slugifyTitle(name);

    const existing = await getBlogTagBySlug(slug);
    if (existing) {
        throw new HttpError(HttpStatus.CONFLICT, "Tag slug already exists", ErrorCode.VALIDATION_ERROR);
    }

    const tag = await prisma.tag.create({
        data: {
            name,
            slug,
        },
    });

    return mapTag(tag);
}

export async function adminUpdateBlogTag(
    tagId: string,
    input: {
        name?: string;
        slug?: string;
    },
): Promise<BlogTagDto> {
    const prisma = getPrisma();
    const existing = await getBlogTagById(tagId);
    if (!existing) {
        throw new HttpError(HttpStatus.NOT_FOUND, "Tag not found", ErrorCode.NOT_FOUND);
    }

    if (input.slug?.trim()) {
        const requestedSlug = input.slug.trim();
        if (requestedSlug !== existing.slug) {
            const slugTaken = await getBlogTagBySlug(requestedSlug, tagId);
            if (slugTaken) {
                throw new HttpError(HttpStatus.CONFLICT, "Tag slug already exists", ErrorCode.VALIDATION_ERROR);
            }
        }
    }

    const tag = await prisma.tag.update({
        where: { id: tagId },
        data: {
            ...(input.name !== undefined ? { name: input.name.trim() } : {}),
            ...(input.slug !== undefined ? { slug: input.slug.trim() } : {}),
        },
    });

    return mapTag(tag);
}

export async function adminDeleteBlogTag(tagId: string): Promise<void> {
    const prisma = getPrisma();
    const existing = await getBlogTagById(tagId);
    if (!existing) {
        throw new HttpError(HttpStatus.NOT_FOUND, "Tag not found", ErrorCode.NOT_FOUND);
    }

    const postCount = await prisma.blogPostTag.count({
        where: { tagId },
    });
    if (postCount > 0) {
        throw new HttpError(HttpStatus.CONFLICT, "Tag is in use by active posts", ErrorCode.VALIDATION_ERROR);
    }

    await prisma.tag.delete({
        where: { id: tagId },
    });
}

export async function listPublishedBlogPosts(params: {
    q?: string;
    tagSlug?: string;
    sort: "new" | "updated";
    verifiedOnly: boolean;
    authorId?: string;
    skip: number;
    take: number;
}): Promise<{ items: BlogPostListItemDto[]; total: number }> {
    const prisma = getPrisma();
    const q = params.q?.trim().toLowerCase();
    let tagId: string | undefined;
    if (params.tagSlug?.trim()) {
        const tag = await prisma.tag.findFirst({
            where: { slug: params.tagSlug.trim() },
        });
        if (!tag) return { items: [], total: 0 };
        tagId = tag.id;
    }

    const where: import("../../generated/prisma/client.js").Prisma.BlogPostWhereInput = {
        status: BlogPostStatus.PUBLISHED,
        ...(params.verifiedOnly ? { isVerified: true } : {}),
        ...(params.authorId ? { authorId: params.authorId } : {}),
        ...(tagId ? { tags: { some: { tagId } } } : {}),
        ...(q
            ? {
                  OR: [{ title: { contains: q } }, { excerpt: { contains: q } }, { body: { contains: q } }],
              }
            : {}),
    };

    const orderBy = params.sort === "updated" ? { updatedAt: "desc" as const } : { createdAt: "desc" as const };

    const [total, rows] = await prisma.$transaction([
        prisma.blogPost.count({ where }),
        prisma.blogPost.findMany({
            where,
            orderBy,
            skip: params.skip,
            take: params.take,
            include: blogPostIncludeListWithCounts,
        }),
    ]);

    return {
        total,
        items: rows.map((p) => mapPostListItem(p as BlogPostRowList)),
    };
}

export async function getPublishedBlogPostBySlug(slug: string): Promise<BlogPostDetailDto | null> {
    const prisma = getPrisma();
    const post = await prisma.blogPost.findFirst({
        where: {
            slug,
            status: BlogPostStatus.PUBLISHED,
        },
        include: blogPostIncludeDetail,
    });
    if (!post) return null;
    return mapPostDetail(post as BlogPostRowDetail);
}

export async function listMyBlogPosts(params: {
    userId: string;
    skip: number;
    take: number;
}): Promise<{ items: BlogPostListItemDto[]; total: number }> {
    const prisma = getPrisma();
    const where = {
        authorId: params.userId,
    };
    const [total, rows] = await prisma.$transaction([
        prisma.blogPost.count({ where }),
        prisma.blogPost.findMany({
            where,
            orderBy: { updatedAt: "desc" },
            skip: params.skip,
            take: params.take,
            include: blogPostIncludeListWithCounts,
        }),
    ]);
    return {
        total,
        items: rows.map((p) => mapPostListItem(p as BlogPostRowList)),
    };
}

export async function getMyBlogPostById(userId: string, postId: string): Promise<BlogPostDetailDto | null> {
    const prisma = getPrisma();
    const post = await prisma.blogPost.findFirst({
        where: { id: postId, authorId: userId },
        include: blogPostIncludeDetail,
    });
    if (!post) return null;
    return mapPostDetail(post as BlogPostRowDetail);
}

export async function createBlogPostForUser(
    userId: string,
    input: {
        title: string;
        body: string;
        excerpt?: string | null;
        thumbnailUrl?: string | null;
        status?: BlogPostStatus;
        slug?: string | null;
        tagIds?: string[];
    },
): Promise<BlogPostListItemDto> {
    const prisma = getPrisma();
    const status = input.status ?? BlogPostStatus.DRAFT;
    let slug: string;
    if (input.slug?.trim()) {
        const requested = input.slug.trim();
        const taken = await prisma.blogPost.findFirst({
            where: { slug: requested },
            select: { id: true },
        });
        if (taken) {
            throw new HttpError(
                HttpStatus.CONFLICT,
                ERROR_MESSAGES[ErrorCode.HUB_SLUG_TAKEN] ?? "Slug already taken",
                ErrorCode.HUB_SLUG_TAKEN,
            );
        }
        slug = requested;
    } else {
        slug = await allocateUniqueBlogSlug(slugifyTitle(input.title));
    }

    const bodyNorm = normalizeBlogBodyHtml(input.body);
    const excerpt =
        input.excerpt !== undefined && input.excerpt !== null && String(input.excerpt).trim() !== ""
            ? String(input.excerpt).trim()
            : excerptFromBody(bodyNorm);

    const post = await prisma.blogPost.create({
        data: {
            authorId: userId,
            slug,
            title: input.title,
            body: bodyNorm,
            excerpt,
            thumbnailUrl:
                input.thumbnailUrl === undefined || input.thumbnailUrl === null || input.thumbnailUrl === ""
                    ? null
                    : input.thumbnailUrl.trim(),
            status,
            isVerified: false,
        },
        include: blogPostIncludeListWithCounts,
    });

    if (input.tagIds?.length) {
        await replaceBlogPostTags(post.id, input.tagIds);
        const reloaded = await prisma.blogPost.findFirst({
            where: { id: post.id },
            include: blogPostIncludeListWithCounts,
        });
        if (status === BlogPostStatus.PUBLISHED) {
            await awardPublishedBlogScore(userId, post.id, 0);
        }
        return mapPostListItem(reloaded as BlogPostRowList);
    }

    if (status === BlogPostStatus.PUBLISHED) {
        await awardPublishedBlogScore(userId, post.id, 0);
    }
    return mapPostListItem(post as BlogPostRowList);
}

export async function updateMyBlogPost(
    userId: string,
    postId: string,
    input: {
        title?: string;
        body?: string;
        excerpt?: string | null;
        thumbnailUrl?: string | null;
        status?: BlogPostStatus;
        slug?: string | null;
        tagIds?: string[];
    },
): Promise<BlogPostListItemDto> {
    const prisma = getPrisma();
    const existing = await prisma.blogPost.findFirst({
        where: { id: postId },
    });
    if (!existing || existing.authorId !== userId) {
        throw new HttpError(HttpStatus.NOT_FOUND, "Post not found", ErrorCode.NOT_FOUND);
    }

    if (input.slug?.trim() && input.slug.trim() !== existing.slug) {
        const taken = await prisma.blogPost.findFirst({
            where: { slug: input.slug.trim(), NOT: { id: postId } },
            select: { id: true },
        });
        if (taken) {
            throw new HttpError(
                HttpStatus.CONFLICT,
                ERROR_MESSAGES[ErrorCode.HUB_SLUG_TAKEN] ?? "Slug already taken",
                ErrorCode.HUB_SLUG_TAKEN,
            );
        }
    }

    const nextBody = input.body !== undefined ? normalizeBlogBodyHtml(input.body) : existing.body;
    const excerpt =
        input.excerpt !== undefined
            ? input.excerpt === null || String(input.excerpt).trim() === ""
                ? excerptFromBody(nextBody)
                : String(input.excerpt).trim()
            : undefined;

    const thumb =
        input.thumbnailUrl === undefined
            ? undefined
            : input.thumbnailUrl === null || input.thumbnailUrl === ""
              ? null
              : input.thumbnailUrl.trim();

    const prevStatus = existing.status;
    const nextStatus = input.status !== undefined ? input.status : prevStatus;
    const likeCount = await getBlogPostLikeCount(postId);

    await prisma.blogPost.update({
        where: { id: postId },
        data: {
            ...(input.title !== undefined ? { title: input.title } : {}),
            ...(input.body !== undefined ? { body: nextBody } : {}),
            ...(excerpt !== undefined ? { excerpt } : {}),
            ...(input.status !== undefined ? { status: input.status } : {}),
            ...(input.slug?.trim() !== undefined ? { slug: input.slug.trim() } : {}),
            ...(thumb !== undefined ? { thumbnailUrl: thumb } : {}),
        },
    });

    if (input.tagIds !== undefined) {
        await replaceBlogPostTags(postId, input.tagIds);
    }

    if (prevStatus !== BlogPostStatus.PUBLISHED && nextStatus === BlogPostStatus.PUBLISHED) {
        await awardPublishedBlogScore(existing.authorId, postId, likeCount);
    } else if (prevStatus === BlogPostStatus.PUBLISHED && nextStatus !== BlogPostStatus.PUBLISHED) {
        await revokePublishedBlogScore(existing.authorId, postId, likeCount);
    }

    const reloaded = await prisma.blogPost.findFirst({
        where: { id: postId },
        include: blogPostIncludeListWithCounts,
    });
    return mapPostListItem(reloaded as BlogPostRowList);
}

export async function deleteMyBlogPost(userId: string, postId: string): Promise<void> {
    const prisma = getPrisma();
    const existing = await prisma.blogPost.findFirst({
        where: { id: postId },
    });
    if (!existing || existing.authorId !== userId) {
        throw new HttpError(HttpStatus.NOT_FOUND, "Post not found", ErrorCode.NOT_FOUND);
    }
    if (existing.status === BlogPostStatus.PUBLISHED) {
        const likeCount = await getBlogPostLikeCount(postId);
        await revokePublishedBlogScore(existing.authorId, postId, likeCount);
    }
    await prisma.blogPost.delete({
        where: { id: postId },
    });
}

export async function adminListBlogPosts(params: {
    q?: string;
    tagSlug?: string;
    sort: "new" | "updated";
    verifiedOnly: boolean;
    status?: BlogPostStatus;
    authorId?: string;
    skip: number;
    take: number;
}): Promise<{ items: BlogPostListItemDto[]; total: number }> {
    const prisma = getPrisma();
    const q = params.q?.trim().toLowerCase();
    let tagId: string | undefined;
    if (params.tagSlug?.trim()) {
        const tag = await prisma.tag.findFirst({
            where: { slug: params.tagSlug.trim() },
        });
        tagId = tag?.id;
        if (params.tagSlug.trim() && !tag) {
            return { items: [], total: 0 };
        }
    }

    const where: import("../../generated/prisma/client.js").Prisma.BlogPostWhereInput = {
        ...(params.status ? { status: params.status } : {}),
        ...(params.authorId ? { authorId: params.authorId } : {}),
        ...(params.verifiedOnly ? { isVerified: true } : {}),
        ...(tagId ? { tags: { some: { tagId } } } : {}),
        ...(q
            ? {
                  OR: [
                      { title: { contains: q } },
                      { excerpt: { contains: q } },
                      { body: { contains: q } },
                      { slug: { contains: q } },
                  ],
              }
            : {}),
    };

    const orderBy = params.sort === "updated" ? { updatedAt: "desc" as const } : { createdAt: "desc" as const };

    const [total, rows] = await prisma.$transaction([
        prisma.blogPost.count({ where }),
        prisma.blogPost.findMany({
            where,
            orderBy,
            skip: params.skip,
            take: params.take,
            include: blogPostIncludeListWithCounts,
        }),
    ]);

    return {
        total,
        items: rows.map((p) => mapPostListItem(p as BlogPostRowList)),
    };
}

export async function getAdminBlogPostById(postId: string): Promise<BlogPostDetailDto | null> {
    const prisma = getPrisma();
    const post = await prisma.blogPost.findFirst({
        where: { id: postId },
        include: blogPostIncludeDetail,
    });
    if (!post) return null;
    return mapPostDetail(post as BlogPostRowDetail);
}

export async function adminCreateBlogPost(input: {
    authorId: string;
    title: string;
    body: string;
    excerpt?: string | null;
    thumbnailUrl?: string | null;
    status?: BlogPostStatus;
    slug?: string | null;
    tagIds?: string[];
}): Promise<BlogPostListItemDto> {
    const prisma = getPrisma();
    const author = await prisma.user.findFirst({
        where: { id: input.authorId },
    });
    if (!author) {
        throw new HttpError(HttpStatus.BAD_REQUEST, "Author not found", ErrorCode.VALIDATION_ERROR);
    }

    const status = input.status ?? BlogPostStatus.DRAFT;
    let slug: string;
    if (input.slug?.trim()) {
        const requested = input.slug.trim();
        const taken = await prisma.blogPost.findFirst({
            where: { slug: requested },
            select: { id: true },
        });
        if (taken) {
            throw new HttpError(
                HttpStatus.CONFLICT,
                ERROR_MESSAGES[ErrorCode.HUB_SLUG_TAKEN] ?? "Slug taken",
                ErrorCode.HUB_SLUG_TAKEN,
            );
        }
        slug = requested;
    } else {
        slug = await allocateUniqueBlogSlug(slugifyTitle(input.title));
    }

    const bodyNorm = normalizeBlogBodyHtml(input.body);
    const excerpt =
        input.excerpt !== undefined && input.excerpt !== null && String(input.excerpt).trim() !== ""
            ? String(input.excerpt).trim()
            : excerptFromBody(bodyNorm);

    const post = await prisma.blogPost.create({
        data: {
            authorId: input.authorId,
            slug,
            title: input.title,
            body: bodyNorm,
            excerpt,
            thumbnailUrl:
                input.thumbnailUrl === undefined || input.thumbnailUrl === null || input.thumbnailUrl === ""
                    ? null
                    : input.thumbnailUrl.trim(),
            status,
            isVerified: false,
        },
        include: blogPostIncludeListWithCounts,
    });

    if (input.tagIds?.length) {
        await replaceBlogPostTags(post.id, input.tagIds);
    }

    const reloaded = await prisma.blogPost.findFirst({
        where: { id: post.id },
        include: blogPostIncludeListWithCounts,
    });
    if (status === BlogPostStatus.PUBLISHED) {
        await awardPublishedBlogScore(input.authorId, post.id, 0);
    }
    return mapPostListItem(reloaded as BlogPostRowList);
}

export async function adminUpdateBlogPost(
    postId: string,
    _adminUserId: string,
    input: {
        title?: string;
        body?: string;
        excerpt?: string | null;
        thumbnailUrl?: string | null;
        status?: BlogPostStatus;
        slug?: string | null;
        authorId?: string;
        tagIds?: string[];
    },
): Promise<BlogPostListItemDto> {
    const prisma = getPrisma();
    const existing = await prisma.blogPost.findFirst({
        where: { id: postId },
    });
    if (!existing) {
        throw new HttpError(HttpStatus.NOT_FOUND, "Post not found", ErrorCode.NOT_FOUND);
    }

    if (input.authorId !== undefined) {
        const u = await prisma.user.findFirst({
            where: { id: input.authorId },
        });
        if (!u) {
            throw new HttpError(HttpStatus.BAD_REQUEST, "Author not found", ErrorCode.VALIDATION_ERROR);
        }
    }

    if (input.slug?.trim() && input.slug.trim() !== existing.slug) {
        const taken = await prisma.blogPost.findFirst({
            where: { slug: input.slug.trim(), NOT: { id: postId } },
            select: { id: true },
        });
        if (taken) {
            throw new HttpError(
                HttpStatus.CONFLICT,
                ERROR_MESSAGES[ErrorCode.HUB_SLUG_TAKEN] ?? "Slug taken",
                ErrorCode.HUB_SLUG_TAKEN,
            );
        }
    }

    const nextBody = input.body !== undefined ? normalizeBlogBodyHtml(input.body) : existing.body;
    const excerpt =
        input.excerpt !== undefined
            ? input.excerpt === null || String(input.excerpt).trim() === ""
                ? excerptFromBody(nextBody)
                : String(input.excerpt).trim()
            : undefined;

    const thumb =
        input.thumbnailUrl === undefined
            ? undefined
            : input.thumbnailUrl === null || input.thumbnailUrl === ""
              ? null
              : input.thumbnailUrl.trim();

    const prevStatus = existing.status;
    const nextStatus = input.status !== undefined ? input.status : prevStatus;
    const nextAuthorId = input.authorId !== undefined ? input.authorId : existing.authorId;
    const likeCount = await getBlogPostLikeCount(postId);

    await prisma.blogPost.update({
        where: { id: postId },
        data: {
            ...(input.title !== undefined ? { title: input.title } : {}),
            ...(input.body !== undefined ? { body: nextBody } : {}),
            ...(excerpt !== undefined ? { excerpt } : {}),
            ...(input.status !== undefined ? { status: input.status } : {}),
            ...(input.slug?.trim() !== undefined ? { slug: input.slug.trim() } : {}),
            ...(input.authorId !== undefined ? { authorId: input.authorId } : {}),
            ...(thumb !== undefined ? { thumbnailUrl: thumb } : {}),
        },
    });

    if (input.tagIds !== undefined) {
        await replaceBlogPostTags(postId, input.tagIds);
    }

    if (prevStatus !== BlogPostStatus.PUBLISHED && nextStatus === BlogPostStatus.PUBLISHED) {
        await awardPublishedBlogScore(nextAuthorId, postId, likeCount);
    } else if (prevStatus === BlogPostStatus.PUBLISHED && nextStatus !== BlogPostStatus.PUBLISHED) {
        await revokePublishedBlogScore(existing.authorId, postId, likeCount);
    } else if (
        prevStatus === BlogPostStatus.PUBLISHED &&
        nextStatus === BlogPostStatus.PUBLISHED &&
        existing.authorId !== nextAuthorId
    ) {
        await revokePublishedBlogScore(existing.authorId, postId, likeCount);
        await awardPublishedBlogScore(nextAuthorId, postId, likeCount);
    }

    const reloaded = await prisma.blogPost.findFirst({
        where: { id: postId },
        include: blogPostIncludeListWithCounts,
    });
    return mapPostListItem(reloaded as BlogPostRowList);
}

export async function adminUpdateBlogPostVerification(
    postId: string,
    adminUserId: string,
    input: {
        isVerified: boolean;
        verificationNotes?: string | null;
    },
): Promise<BlogPostDetailDto> {
    const prisma = getPrisma();
    const existing = await prisma.blogPost.findFirst({
        where: { id: postId },
    });
    if (!existing) {
        throw new HttpError(HttpStatus.NOT_FOUND, "Post not found", ErrorCode.NOT_FOUND);
    }

    const normalizedNotes =
        input.verificationNotes === undefined
            ? undefined
            : input.verificationNotes === null || String(input.verificationNotes).trim() === ""
              ? null
              : String(input.verificationNotes).trim();

    const verificationData = input.isVerified
        ? {
              isVerified: true,
              verifiedAt: existing.verifiedAt ?? new Date(),
              verifiedByUserId: existing.isVerified ? (existing.verifiedByUserId ?? adminUserId) : adminUserId,
              ...(normalizedNotes !== undefined ? { verificationNotes: normalizedNotes } : {}),
          }
        : {
              isVerified: false,
              verifiedAt: null,
              verifiedByUserId: null,
              verificationNotes: null,
          };

    const updated = await prisma.blogPost.update({
        where: { id: postId },
        data: verificationData,
        include: blogPostIncludeDetail,
    });

    return mapPostDetail(updated as BlogPostRowDetail);
}

export async function adminDeleteBlogPost(postId: string): Promise<void> {
    const prisma = getPrisma();
    const existing = await prisma.blogPost.findFirst({
        where: { id: postId },
    });
    if (!existing) {
        throw new HttpError(HttpStatus.NOT_FOUND, "Post not found", ErrorCode.NOT_FOUND);
    }
    if (existing.status === BlogPostStatus.PUBLISHED) {
        const likeCount = await getBlogPostLikeCount(postId);
        await revokePublishedBlogScore(existing.authorId, postId, likeCount);
    }
    await prisma.blogPost.delete({
        where: { id: postId },
    });
}

async function assertPublishedBlogPostForComments(postId: string): Promise<void> {
    const prisma = getPrisma();
    const post = await prisma.blogPost.findFirst({
        where: {
            id: postId,
            status: BlogPostStatus.PUBLISHED,
        },
        select: { id: true },
    });
    if (!post) {
        throw new HttpError(HttpStatus.NOT_FOUND, "Post not found", ErrorCode.NOT_FOUND);
    }
}

export async function createBlogComment(
    userId: string,
    blogPostId: string,
    input: { body: string; parentId?: string | null },
): Promise<BlogCommentDto> {
    await assertPublishedBlogPostForComments(blogPostId);
    const prisma = getPrisma();

    const parentId =
        input.parentId === undefined || input.parentId === null || input.parentId === "" ? null : input.parentId;

    if (parentId) {
        const parent = await prisma.blogComment.findFirst({
            where: { id: parentId, blogPostId },
            select: { id: true },
        });
        if (!parent) {
            throw new HttpError(HttpStatus.BAD_REQUEST, "Parent comment not found", ErrorCode.VALIDATION_ERROR);
        }
        const depth = await blogCommentDepthFromRoot(parentId);
        if (depth < 0 || depth >= BLOG_COMMENT_MAX_DEPTH) {
            throw new HttpError(HttpStatus.BAD_REQUEST, "Max reply depth exceeded", ErrorCode.VALIDATION_ERROR);
        }
    }

    const created = await prisma.blogComment.create({
        data: {
            blogPostId,
            authorId: userId,
            body: input.body,
            parentId,
        },
        include: {
            author: { include: { profile: true } },
            _count: { select: { likes: true } },
        },
    });
    return mapBlogCommentRowToDto(created as BlogCommentAuthorRow);
}

export async function updateBlogComment(
    userId: string,
    blogPostId: string,
    commentId: string,
    input: { body: string },
): Promise<BlogCommentDto> {
    const prisma = getPrisma();
    const existing = await prisma.blogComment.findFirst({
        where: { id: commentId, blogPostId },
        include: { author: { include: { profile: true } } },
    });
    if (!existing) {
        throw new HttpError(HttpStatus.NOT_FOUND, "Comment not found", ErrorCode.NOT_FOUND);
    }
    if (existing.authorId !== userId) {
        throw new HttpError(HttpStatus.FORBIDDEN, ERROR_MESSAGES[ErrorCode.FORBIDDEN], ErrorCode.FORBIDDEN);
    }

    const updated = await prisma.blogComment.update({
        where: { id: commentId },
        data: { body: input.body },
        include: {
            author: { include: { profile: true } },
            _count: { select: { likes: true } },
        },
    });
    return mapBlogCommentRowToDto(updated as BlogCommentAuthorRow);
}

export async function deleteBlogComment(userId: string, blogPostId: string, commentId: string): Promise<void> {
    const prisma = getPrisma();
    const existing = await prisma.blogComment.findFirst({
        where: { id: commentId, blogPostId },
        select: { id: true, authorId: true },
    });
    if (!existing) {
        throw new HttpError(HttpStatus.NOT_FOUND, "Comment not found", ErrorCode.NOT_FOUND);
    }
    if (existing.authorId !== userId) {
        throw new HttpError(HttpStatus.FORBIDDEN, ERROR_MESSAGES[ErrorCode.FORBIDDEN], ErrorCode.FORBIDDEN);
    }
    await prisma.blogComment.delete({
        where: { id: commentId },
    });
}

export async function toggleBlogPostLike(
    userId: string,
    blogPostId: string,
): Promise<{ liked: boolean; likeCount: number }> {
    await assertPublishedBlogPostForComments(blogPostId);
    const prisma = getPrisma();
    const post = await prisma.blogPost.findFirst({
        where: {
            id: blogPostId,
            status: BlogPostStatus.PUBLISHED,
        },
        select: { id: true, authorId: true },
    });
    if (!post) {
        throw new HttpError(HttpStatus.NOT_FOUND, "Post not found", ErrorCode.NOT_FOUND);
    }
    if (post.authorId === userId) {
        throw new HttpError(HttpStatus.CONFLICT, "Cannot like your own post", ErrorCode.VALIDATION_ERROR);
    }

    const existing = await prisma.blogPostLike.findUnique({
        where: {
            userId_blogPostId: { userId, blogPostId },
        },
    });

    if (existing) {
        await prisma.blogPostLike.delete({
            where: { userId_blogPostId: { userId, blogPostId } },
        });
        await applyReputationDelta({
            userId: post.authorId,
            delta: -DELTA_BLOG_POST_LIKED,
            reason: ReputationReason.BLOG_POST_LIKED,
            refBlogPostId: blogPostId,
        });
    } else {
        await prisma.blogPostLike.create({
            data: { userId, blogPostId },
        });
        await applyReputationDelta({
            userId: post.authorId,
            delta: DELTA_BLOG_POST_LIKED,
            reason: ReputationReason.BLOG_POST_LIKED,
            refBlogPostId: blogPostId,
        });
    }

    const likeCount = await prisma.blogPostLike.count({
        where: { blogPostId },
    });
    return { liked: !existing, likeCount };
}

export async function toggleSavedBlogPost(
    userId: string,
    blogPostId: string,
): Promise<{ saved: boolean; savedCount: number }> {
    await assertPublishedBlogPostForComments(blogPostId);
    const prisma = getPrisma();

    const existing = await prisma.savedBlogPost.findUnique({
        where: {
            userId_blogPostId: { userId, blogPostId },
        },
    });

    if (existing) {
        await prisma.savedBlogPost.delete({
            where: { userId_blogPostId: { userId, blogPostId } },
        });
    } else {
        await prisma.savedBlogPost.create({
            data: { userId, blogPostId },
        });
    }

    const savedCount = await prisma.savedBlogPost.count({
        where: { blogPostId },
    });
    return { saved: !existing, savedCount };
}

export async function getBlogPostEngagement(
    userId: string,
    blogPostId: string,
): Promise<{ liked: boolean; saved: boolean }> {
    await assertPublishedBlogPostForComments(blogPostId);
    const prisma = getPrisma();
    const [liked, saved] = await prisma.$transaction([
        prisma.blogPostLike.findUnique({
            where: { userId_blogPostId: { userId, blogPostId } },
            select: { userId: true },
        }),
        prisma.savedBlogPost.findUnique({
            where: { userId_blogPostId: { userId, blogPostId } },
            select: { userId: true },
        }),
    ]);
    return {
        liked: Boolean(liked),
        saved: Boolean(saved),
    };
}

const ENGAGEMENT_BATCH_MAX = 48;

export async function getBlogPostsEngagementBatch(
    userId: string,
    postIds: string[],
): Promise<Array<{ postId: string; liked: boolean; saved: boolean }>> {
    const prisma = getPrisma();
    const unique = [...new Set(postIds.map((x) => x.trim()).filter(Boolean))].slice(0, ENGAGEMENT_BATCH_MAX);
    if (unique.length === 0) return [];

    const published = await prisma.blogPost.findMany({
        where: {
            id: { in: unique },
            status: BlogPostStatus.PUBLISHED,
        },
        select: { id: true },
    });
    const allowed = new Set(published.map((p) => p.id));
    const ids = unique.filter((id) => allowed.has(id));
    if (ids.length === 0) return [];

    const [likes, saves] = await prisma.$transaction([
        prisma.blogPostLike.findMany({
            where: { userId, blogPostId: { in: ids } },
            select: { blogPostId: true },
        }),
        prisma.savedBlogPost.findMany({
            where: { userId, blogPostId: { in: ids } },
            select: { blogPostId: true },
        }),
    ]);
    const likedSet = new Set(likes.map((l) => l.blogPostId));
    const savedSet = new Set(saves.map((s) => s.blogPostId));
    return ids.map((postId) => ({
        postId,
        liked: likedSet.has(postId),
        saved: savedSet.has(postId),
    }));
}

export async function listMySavedBlogPosts(params: {
    userId: string;
    skip: number;
    take: number;
}): Promise<{ items: BlogPostListItemDto[]; total: number }> {
    const prisma = getPrisma();
    const where = {
        userId: params.userId,
        blogPost: {
            status: BlogPostStatus.PUBLISHED,
        },
    };
    const [total, rows] = await prisma.$transaction([
        prisma.savedBlogPost.count({ where }),
        prisma.savedBlogPost.findMany({
            where,
            orderBy: { createdAt: "desc" },
            skip: params.skip,
            take: params.take,
            include: {
                blogPost: {
                    include: blogPostIncludeListWithCounts,
                },
            },
        }),
    ]);

    return {
        total,
        items: rows.map((r) => mapPostListItem(r.blogPost as BlogPostRowList)),
    };
}

const THUMBNAIL_URL_MAX = 2048;

type NormalizedBlogAiPayload = {
    blog: {
        title: string;
        slug: string;
        body: string;
        excerpt: string | null;
        thumbnailUrl: string | null;
    };
    tags: { slug: string; name: string }[];
};

/** First tag per slug wins — avoids duplicate (blogPostId, tagId) on BlogPostTag. */
function dedupeBlogAiTagsBySlug(tags: { slug: string; name: string }[]): { slug: string; name: string }[] {
    const seen = new Set<string>();
    const out: { slug: string; name: string }[] = [];
    for (const t of tags) {
        if (seen.has(t.slug)) {
            continue;
        }
        seen.add(t.slug);
        out.push(t);
    }
    return out;
}

function validateBlogAiPayload(
    data: unknown,
): { ok: true; value: NormalizedBlogAiPayload } | { ok: false; error: string } {
    if (data === null || typeof data !== "object") {
        return { ok: false, error: "Phản hồi AI không phải object JSON." };
    }

    const root = data as Record<string, unknown>;
    const blogRaw = root.blog;
    if (blogRaw === null || typeof blogRaw !== "object" || Array.isArray(blogRaw)) {
        return { ok: false, error: "Thiếu hoặc sai trường blog trong JSON." };
    }

    const b = blogRaw as Record<string, unknown>;
    const title = typeof b.title === "string" ? b.title.trim() : "";
    const slugIn = typeof b.slug === "string" ? b.slug.trim() : "";
    const body = typeof b.body === "string" ? b.body.trim() : "";

    if (!title || !body) {
        return { ok: false, error: "blog.title và blog.body là bắt buộc (chuỗi không rỗng)." };
    }

    const slugBase = slugIn || title;
    const slug = slugifyTitle(slugBase);
    if (!slug) {
        return { ok: false, error: "Không tạo được slug hợp lệ từ phản hồi AI." };
    }

    let excerpt: string | null = null;
    if (typeof b.excerpt === "string") {
        const e = b.excerpt.trim();
        excerpt = e.length > 0 ? e : null;
    }

    const thumbnailUrl = sanitizeOptionalUrl(b.thumbnailUrl, THUMBNAIL_URL_MAX);

    const tagsOut: { slug: string; name: string }[] = [];
    const tagsRaw = root.tags;
    if (Array.isArray(tagsRaw)) {
        for (const item of tagsRaw) {
            if (item === null || typeof item !== "object" || Array.isArray(item)) {
                continue;
            }
            const t = item as Record<string, unknown>;
            const name = typeof t.name === "string" ? t.name.trim() : "";
            const slugFromAi = typeof t.slug === "string" ? t.slug.trim() : "";
            if (!name) {
                continue;
            }
            const tagSlug = normalizeTagSlug(slugFromAi || name);
            if (!tagSlug) {
                continue;
            }
            tagsOut.push({ slug: tagSlug, name: name.slice(0, 200) });
        }
    }

    return {
        ok: true,
        value: {
            blog: { title, slug, body: normalizeBlogBodyHtml(body), excerpt, thumbnailUrl },
            tags: dedupeBlogAiTagsBySlug(tagsOut),
        },
    };
}

async function markBlogIdeaFailedSafe(prisma: ReturnType<typeof getPrisma>, ideaId: number): Promise<void> {
    try {
        await prisma.blogIdea.update({
            where: { id: ideaId },
            data: { status: "FAILED" },
        });
    } catch (rollbackError) {
        console.error("CreateBlogByAI: không cập nhật FAILED cho blogIdea:", rollbackError);
    }
}

export async function createBlogByAI() {
    const prisma = getPrisma();

    const processingIdea = await prisma.blogIdea.findFirst({
        where: { status: "PROCESSING" },
        select: { id: true },
    });
    if (processingIdea) return "An idea is already being processed";

    // 1. Tìm ứng viên PENDING
    const candidate = await prisma.blogIdea.findFirst({
        where: { status: "PENDING" },
        orderBy: { createdAt: "asc" },
        select: { id: true },
    });

    if (!candidate) return "No pending idea found";

    let idea;
    try {
        idea = await prisma.blogIdea.update({
            where: {
                id: candidate.id,
                status: "PENDING",
            },
            data: { status: "PROCESSING" },
        });
    } catch (error) {
        return "Idea is already being processed by another instance";
    }

    const user = await prisma.user.findFirst({
        where: {
            role: { in: ["AI_BOT", "ADMIN"] },
        },
        orderBy: {
            role: "asc",
        },
    });
    if (!user) {
        // Rollback trạng thái nếu không tìm thấy Admin
        await prisma.blogIdea.update({ where: { id: idea.id }, data: { status: "PENDING" } });
        return "Admin found error";
    }

    try {
        // 3. Chuẩn bị dữ liệu cho AI
        const tagsFromDb = await prisma.tag.findMany({ select: { name: true } });
        const existingPosts = await prisma.blogPost.findMany({
            select: { slug: true },
            orderBy: { createdAt: "desc" },
            take: 100,
        });
        const existingSlugs = existingPosts.map((p) => p.slug).join(", ");

        const blogPrompt = await aiConfigService.getPromptByType("blog");
        const modalSystem = await prisma.scheduleBlogSystem.findFirst({ select: { model: true } });

        const prompt = `
        ${blogPrompt}

        - Ý tưởng: ${idea.name}
        - Mô tả: ${idea.description}
        - Danh sách tags có sẵn: [${tagsFromDb.map((t) => t.name).join(", ")}]
        - Danh sách slugs đã tồn tại: [${existingSlugs}]
    `;

        const AIResult = await aiService.generateText(prompt, modalSystem?.model);

        const parsed = parseJsonObject<unknown>(AIResult);
        if (!parsed.ok) {
            throw new Error(parsed.error);
        }

        const validated = validateBlogAiPayload(parsed.value);
        if (!validated.ok) {
            throw new Error(validated.error);
        }

        const { blog, tags } = validated.value;

        // 4. Thực thi Database Transaction
        return await prisma.$transaction(async (tx) => {
            const checkSlug = await tx.blogPost.findUnique({ where: { slug: blog.slug } });
            const finalSlug = checkSlug ? `${blog.slug}-${Date.now()}` : blog.slug;

            await tx.blogPost.create({
                data: {
                    title: blog.title,
                    slug: finalSlug,
                    excerpt: blog.excerpt,
                    body: blog.body,
                    authorId: user.id,
                    thumbnailUrl: blog.thumbnailUrl,
                    status: "PUBLISHED",
                    isVerified: true,
                    verifiedAt: new Date(),
                    verificationNotes: "Verified by AI",
                    legalCorpusVersion: "1.0.0",
                    tags: {
                        create: tags.map((t) => ({
                            tag: {
                                connectOrCreate: {
                                    where: { slug: t.slug },
                                    create: { name: t.name, slug: t.slug },
                                },
                            },
                        })),
                    },
                },
            });

            await tx.blogIdea.update({
                where: { id: idea.id },
                data: { status: "COMPLETED" },
            });

            return "Create blog successfully";
        });
    } catch (error) {
        console.error("Lỗi thực thi CreateBlogByAI:", error);

        if (idea?.id) {
            await markBlogIdeaFailedSafe(prisma, idea.id);
        }

        return "Failed to create blog";
    }
}
