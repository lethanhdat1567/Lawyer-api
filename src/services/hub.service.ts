import type {
  HubCategory,
  HubComment,
  HubPost,
  Profile,
  User,
} from "../../generated/prisma/client.js";
import { HubPostStatus } from "../../generated/prisma/enums.js";
import { ErrorCode } from "../constants/errorCodes.js";
import { HttpStatus } from "../constants/httpStatus.js";
import { ERROR_MESSAGES } from "../constants/messages.js";
import { HttpError } from "../lib/httpError.js";
import { getPrisma } from "../lib/prisma.js";

const EXCERPT_LEN = 180;

/** Deepest reply level (0 = top-level). Aligns with Hub UI `maxDepth` / reply rules. */
const HUB_COMMENT_MAX_DEPTH = 4;

const hubActiveCommentsCount = {
  select: { comments: { where: { deletedAt: null } } },
} as const;

const hubCommentIncludeAuthorAndLikes = {
  author: { include: { profile: true } },
  _count: { select: { likes: true } },
} as const;

export interface HubAuthorDto {
  id: string;
  username: string;
  displayName: string | null;
  avatarUrl: string | null;
}

export interface HubCategoryDto {
  id: string;
  slug: string;
  name: string;
  sortOrder: number;
}

export interface HubOversightVersionDto {
  id: string;
  postId: string;
  version: number;
  summaryText: string;
  suggestionsJson: unknown;
  legalCorpusVersion: string | null;
  modelVersion: string | null;
  isCurrent: boolean;
  createdAt: string;
}

export interface HubCommentDto {
  id: string;
  postId: string;
  parentId: string | null;
  authorId: string;
  body: string;
  createdAt: string;
  likeCount: number;
  author: HubAuthorDto;
}

export interface HubPostListItemDto {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  status: HubPostStatus;
  category: HubCategoryDto | null;
  author: HubAuthorDto;
  createdAt: string;
  updatedAt: string;
  commentCount: number;
}

export interface HubPostDetailDto extends HubPostListItemDto {
  body: string;
  comments: HubCommentDto[];
  oversightVersions: HubOversightVersionDto[];
}

function toIso(d: Date): string {
  return d.toISOString();
}

export function slugifyTitle(title: string): string {
  const base = title
    .trim()
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
  return base || "bai-thao-luan";
}

async function allocateUniqueSlug(
  base: string,
  excludePostId?: string,
): Promise<string> {
  const prisma = getPrisma();
  let n = 0;
  for (;;) {
    const candidate = n === 0 ? base : `${base}-${n}`;
    const existing = await prisma.hubPost.findFirst({
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

function excerptFromBody(body: string): string {
  const flat = body
    .replace(/<[^>]*>/g, " ")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\s+/g, " ")
    .trim();
  if (flat.length <= EXCERPT_LEN) return flat;
  return `${flat.slice(0, EXCERPT_LEN).trim()}â€¦`;
}

function mapAuthor(user: User & { profile: Profile | null }): HubAuthorDto {
  const p = user.profile;
  return {
    id: user.id,
    username: p?.username ?? user.email.split("@")[0] ?? "user",
    displayName: p?.displayName ?? null,
    avatarUrl: p?.avatarUrl ?? null,
  };
}

type HubCommentAuthorRow = HubComment & {
  author: User & { profile: Profile | null };
  _count: { likes: number };
};

function mapCommentRowToDto(c: HubCommentAuthorRow): HubCommentDto {
  return {
    id: c.id,
    postId: c.postId,
    parentId: c.parentId,
    authorId: c.authorId,
    body: c.body,
    createdAt: toIso(c.createdAt),
    likeCount: c._count.likes,
    author: mapAuthor(c.author),
  };
}

async function hubCommentDepthFromRoot(commentId: string): Promise<number> {
  const prisma = getPrisma();
  let depth = 0;
  let curId: string | null = commentId;
  const seen = new Set<string>();
  while (curId) {
    if (seen.has(curId)) return -1;
    seen.add(curId);
    const row: { parentId: string | null } | null =
      await prisma.hubComment.findFirst({
        where: { id: curId, deletedAt: null },
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

function mapCategory(
  c: HubCategory | null,
): HubCategoryDto | null {
  if (!c) return null;
  return {
    id: c.id,
    slug: c.slug,
    name: c.name,
    sortOrder: c.sortOrder,
  };
}

type PostRowList = HubPost & {
  category: HubCategory | null;
  author: User & { profile: Profile | null };
  _count: { comments: number };
};

function mapPostListItem(p: PostRowList): HubPostListItemDto {
  return {
    id: p.id,
    slug: p.slug,
    title: p.title,
    excerpt: excerptFromBody(p.body),
    status: p.status,
    category: mapCategory(p.category),
    author: mapAuthor(p.author),
    createdAt: toIso(p.createdAt),
    updatedAt: toIso(p.updatedAt),
    commentCount: p._count.comments,
  };
}

export async function listHubCategories(): Promise<HubCategoryDto[]> {
  const prisma = getPrisma();
  const rows = await prisma.hubCategory.findMany({
    where: { deletedAt: null },
    orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
  });
  return rows.map((c) => mapCategory(c)!);
}

export async function listPublishedHubPosts(params: {
  q?: string;
  categorySlug?: string;
  sort: "new" | "updated";
  authorId?: string;
  skip: number;
  take: number;
}): Promise<{ items: HubPostListItemDto[]; total: number }> {
  const prisma = getPrisma();
  const q = params.q?.trim().toLowerCase();
  let categoryId: string | undefined;
  if (params.categorySlug?.trim()) {
    const cat = await prisma.hubCategory.findFirst({
      where: { slug: params.categorySlug.trim(), deletedAt: null },
    });
    if (!cat) {
      return { items: [], total: 0 };
    }
    categoryId = cat.id;
  }

  const where: import("../../generated/prisma/client.js").Prisma.HubPostWhereInput =
    {
      deletedAt: null,
      status: HubPostStatus.PUBLISHED,
      ...(categoryId ? { categoryId } : {}),
      ...(params.authorId ? { authorId: params.authorId } : {}),
      ...(q
        ? {
            OR: [
              { title: { contains: q } },
              { body: { contains: q } },
            ],
          }
        : {}),
    };

  const orderBy =
    params.sort === "updated"
      ? { updatedAt: "desc" as const }
      : { createdAt: "desc" as const };

  const [total, rows] = await prisma.$transaction([
    prisma.hubPost.count({ where }),
    prisma.hubPost.findMany({
      where,
      orderBy,
      skip: params.skip,
      take: params.take,
      include: {
        category: true,
        author: { include: { profile: true } },
        _count: hubActiveCommentsCount,
      },
    }),
  ]);

  return {
    total,
    items: rows.map((p) => mapPostListItem(p as PostRowList)),
  };
}

export async function getPublishedHubPostBySlug(
  slug: string,
): Promise<HubPostDetailDto | null> {
  const prisma = getPrisma();
  const post = await prisma.hubPost.findFirst({
    where: {
      slug,
      deletedAt: null,
      status: HubPostStatus.PUBLISHED,
    },
    include: {
      category: true,
      author: { include: { profile: true } },
      _count: hubActiveCommentsCount,
      comments: {
        where: { deletedAt: null },
        orderBy: { createdAt: "asc" },
        include: hubCommentIncludeAuthorAndLikes,
      },
      oversights: {
        orderBy: { version: "asc" },
      },
    },
  });
  if (!post) return null;

  const base = mapPostListItem(post as PostRowList);
  const oversightVersions: HubOversightVersionDto[] = post.oversights.map(
    (v) => ({
      id: v.id,
      postId: v.postId,
      version: v.version,
      summaryText: v.summaryText,
      suggestionsJson: v.suggestionsJson,
      legalCorpusVersion: v.legalCorpusVersion,
      modelVersion: v.modelVersion,
      isCurrent: v.isCurrent,
      createdAt: toIso(v.createdAt),
    }),
  );

  const comments: HubCommentDto[] = post.comments.map((c) =>
    mapCommentRowToDto(c as HubCommentAuthorRow),
  );

  return {
    ...base,
    body: post.body,
    comments,
    oversightVersions,
  };
}

export async function getMyHubPostDetail(
  userId: string,
  postId: string,
): Promise<HubPostDetailDto | null> {
  const prisma = getPrisma();
  const post = await prisma.hubPost.findFirst({
    where: {
      id: postId,
      authorId: userId,
      deletedAt: null,
    },
    include: {
      category: true,
      author: { include: { profile: true } },
      _count: hubActiveCommentsCount,
      comments: {
        where: { deletedAt: null },
        orderBy: { createdAt: "asc" },
        include: hubCommentIncludeAuthorAndLikes,
      },
      oversights: {
        orderBy: { version: "asc" },
      },
    },
  });
  if (!post) return null;

  const base = mapPostListItem(post as PostRowList);
  const oversightVersions: HubOversightVersionDto[] = post.oversights.map(
    (v) => ({
      id: v.id,
      postId: v.postId,
      version: v.version,
      summaryText: v.summaryText,
      suggestionsJson: v.suggestionsJson,
      legalCorpusVersion: v.legalCorpusVersion,
      modelVersion: v.modelVersion,
      isCurrent: v.isCurrent,
      createdAt: toIso(v.createdAt),
    }),
  );
  const comments: HubCommentDto[] = post.comments.map((c) =>
    mapCommentRowToDto(c as HubCommentAuthorRow),
  );

  return {
    ...base,
    body: post.body,
    comments,
    oversightVersions,
  };
}

export async function listMyHubPosts(params: {
  userId: string;
  skip: number;
  take: number;
}): Promise<{ items: HubPostListItemDto[]; total: number }> {
  const prisma = getPrisma();
  const where = {
    deletedAt: null,
    authorId: params.userId,
  };
  const [total, rows] = await prisma.$transaction([
    prisma.hubPost.count({ where }),
    prisma.hubPost.findMany({
      where,
      orderBy: { updatedAt: "desc" },
      skip: params.skip,
      take: params.take,
      include: {
        category: true,
        author: { include: { profile: true } },
        _count: hubActiveCommentsCount,
      },
    }),
  ]);
  return {
    total,
    items: rows.map((p) => mapPostListItem(p as PostRowList)),
  };
}

export async function createHubPostForUser(
  userId: string,
  input: {
    title: string;
    body: string;
    categoryId: string | null;
    status?: HubPostStatus;
  },
): Promise<HubPostListItemDto> {
  const prisma = getPrisma();
  if (input.categoryId) {
    const cat = await prisma.hubCategory.findFirst({
      where: { id: input.categoryId, deletedAt: null },
    });
    if (!cat) {
      throw new HttpError(
        HttpStatus.BAD_REQUEST,
        "Category not found",
        ErrorCode.VALIDATION_ERROR,
      );
    }
  }
  const baseSlug = slugifyTitle(input.title);
  const slug = await allocateUniqueSlug(baseSlug);
  const status = input.status ?? HubPostStatus.PUBLISHED;
  const post = await prisma.hubPost.create({
    data: {
      authorId: userId,
      slug,
      title: input.title,
      body: input.body,
      categoryId: input.categoryId,
      status,
    },
    include: {
      category: true,
      author: { include: { profile: true } },
      _count: hubActiveCommentsCount,
    },
  });
  return mapPostListItem(post as PostRowList);
}

export async function updateMyHubPost(
  userId: string,
  postId: string,
  input: {
    title?: string;
    body?: string;
    categoryId?: string | null;
    status?: HubPostStatus;
  },
): Promise<HubPostListItemDto> {
  const prisma = getPrisma();
  const existing = await prisma.hubPost.findFirst({
    where: { id: postId, deletedAt: null },
  });
  if (!existing || existing.authorId !== userId) {
    throw new HttpError(
      HttpStatus.NOT_FOUND,
      "Post not found",
      ErrorCode.NOT_FOUND,
    );
  }
  if (input.categoryId !== undefined && input.categoryId !== null) {
    const cat = await prisma.hubCategory.findFirst({
      where: { id: input.categoryId, deletedAt: null },
    });
    if (!cat) {
      throw new HttpError(
        HttpStatus.BAD_REQUEST,
        "Category not found",
        ErrorCode.VALIDATION_ERROR,
      );
    }
  }
  const post = await prisma.hubPost.update({
    where: { id: postId },
    data: {
      ...(input.title !== undefined ? { title: input.title } : {}),
      ...(input.body !== undefined ? { body: input.body } : {}),
      ...(input.categoryId !== undefined ? { categoryId: input.categoryId } : {}),
      ...(input.status !== undefined ? { status: input.status } : {}),
    },
    include: {
      category: true,
      author: { include: { profile: true } },
      _count: hubActiveCommentsCount,
    },
  });
  return mapPostListItem(post as PostRowList);
}

export async function softDeleteMyHubPost(
  userId: string,
  postId: string,
): Promise<void> {
  const prisma = getPrisma();
  const existing = await prisma.hubPost.findFirst({
    where: { id: postId, deletedAt: null },
  });
  if (!existing || existing.authorId !== userId) {
    throw new HttpError(
      HttpStatus.NOT_FOUND,
      "Post not found",
      ErrorCode.NOT_FOUND,
    );
  }
  await prisma.hubPost.update({
    where: { id: postId },
    data: { deletedAt: new Date() },
  });
}

export async function adminListHubPosts(params: {
  q?: string;
  categorySlug?: string;
  sort: "new" | "updated";
  status?: HubPostStatus;
  authorId?: string;
  skip: number;
  take: number;
}): Promise<{ items: HubPostListItemDto[]; total: number }> {
  const prisma = getPrisma();
  const q = params.q?.trim().toLowerCase();
  let categoryId: string | undefined;
  if (params.categorySlug?.trim()) {
    const cat = await prisma.hubCategory.findFirst({
      where: { slug: params.categorySlug.trim(), deletedAt: null },
    });
    categoryId = cat?.id;
    if (params.categorySlug.trim() && !cat) {
      return { items: [], total: 0 };
    }
  }

  const where: import("../../generated/prisma/client.js").Prisma.HubPostWhereInput =
    {
      deletedAt: null,
      ...(categoryId ? { categoryId } : {}),
      ...(params.status ? { status: params.status } : {}),
      ...(params.authorId ? { authorId: params.authorId } : {}),
      ...(q
        ? {
            OR: [
              { title: { contains: q } },
              { body: { contains: q } },
              { slug: { contains: q } },
            ],
          }
        : {}),
    };

  const orderBy =
    params.sort === "updated"
      ? { updatedAt: "desc" as const }
      : { createdAt: "desc" as const };

  const [total, rows] = await prisma.$transaction([
    prisma.hubPost.count({ where }),
    prisma.hubPost.findMany({
      where,
      orderBy,
      skip: params.skip,
      take: params.take,
      include: {
        category: true,
        author: { include: { profile: true } },
        _count: hubActiveCommentsCount,
      },
    }),
  ]);

  return {
    total,
    items: rows.map((p) => mapPostListItem(p as PostRowList)),
  };
}

export async function adminCreateHubPost(input: {
  authorId: string;
  title: string;
  body: string;
  categoryId: string | null;
  status?: HubPostStatus;
  slug?: string;
}): Promise<HubPostListItemDto> {
  const prisma = getPrisma();
  const user = await prisma.user.findFirst({
    where: { id: input.authorId, deletedAt: null },
  });
  if (!user) {
    throw new HttpError(
      HttpStatus.BAD_REQUEST,
      "Author not found",
      ErrorCode.VALIDATION_ERROR,
    );
  }
  if (input.categoryId) {
    const cat = await prisma.hubCategory.findFirst({
      where: { id: input.categoryId, deletedAt: null },
    });
    if (!cat) {
      throw new HttpError(
        HttpStatus.BAD_REQUEST,
        "Category not found",
        ErrorCode.VALIDATION_ERROR,
      );
    }
  }
  let slug: string;
  if (input.slug?.trim()) {
    const requested = input.slug.trim();
    const taken = await prisma.hubPost.findFirst({
      where: { slug: requested },
      select: { id: true },
    });
    if (taken) {
      throw new HttpError(
        HttpStatus.CONFLICT,
        ERROR_MESSAGES[ErrorCode.HUB_SLUG_TAKEN],
        ErrorCode.HUB_SLUG_TAKEN,
      );
    }
    slug = requested;
  } else {
    slug = await allocateUniqueSlug(slugifyTitle(input.title));
  }
  const status = input.status ?? HubPostStatus.PUBLISHED;
  const post = await prisma.hubPost.create({
    data: {
      authorId: input.authorId,
      slug,
      title: input.title,
      body: input.body,
      categoryId: input.categoryId,
      status,
    },
    include: {
      category: true,
      author: { include: { profile: true } },
      _count: hubActiveCommentsCount,
    },
  });
  return mapPostListItem(post as PostRowList);
}

export async function adminUpdateHubPost(
  postId: string,
  input: {
    title?: string;
    body?: string;
    categoryId?: string | null;
    status?: HubPostStatus;
    slug?: string;
    authorId?: string;
  },
): Promise<HubPostListItemDto> {
  const prisma = getPrisma();
  const existing = await prisma.hubPost.findFirst({
    where: { id: postId, deletedAt: null },
  });
  if (!existing) {
    throw new HttpError(
      HttpStatus.NOT_FOUND,
      "Post not found",
      ErrorCode.NOT_FOUND,
    );
  }
  if (input.authorId !== undefined) {
    const user = await prisma.user.findFirst({
      where: { id: input.authorId, deletedAt: null },
    });
    if (!user) {
      throw new HttpError(
        HttpStatus.BAD_REQUEST,
        "Author not found",
        ErrorCode.VALIDATION_ERROR,
      );
    }
  }
  if (input.categoryId !== undefined && input.categoryId !== null) {
    const cat = await prisma.hubCategory.findFirst({
      where: { id: input.categoryId, deletedAt: null },
    });
    if (!cat) {
      throw new HttpError(
        HttpStatus.BAD_REQUEST,
        "Category not found",
        ErrorCode.VALIDATION_ERROR,
      );
    }
  }
  if (input.slug?.trim()) {
    const requested = input.slug.trim();
    if (requested !== existing.slug) {
      const taken = await prisma.hubPost.findFirst({
        where: { slug: requested, NOT: { id: postId } },
        select: { id: true },
      });
      if (taken) {
        throw new HttpError(
          HttpStatus.CONFLICT,
          ERROR_MESSAGES[ErrorCode.HUB_SLUG_TAKEN],
          ErrorCode.HUB_SLUG_TAKEN,
        );
      }
    }
  }
  const post = await prisma.hubPost.update({
    where: { id: postId },
    data: {
      ...(input.title !== undefined ? { title: input.title } : {}),
      ...(input.body !== undefined ? { body: input.body } : {}),
      ...(input.categoryId !== undefined ? { categoryId: input.categoryId } : {}),
      ...(input.status !== undefined ? { status: input.status } : {}),
      ...(input.slug?.trim() !== undefined
        ? { slug: input.slug.trim() }
        : {}),
      ...(input.authorId !== undefined ? { authorId: input.authorId } : {}),
    },
    include: {
      category: true,
      author: { include: { profile: true } },
      _count: hubActiveCommentsCount,
    },
  });
  return mapPostListItem(post as PostRowList);
}

export async function getAdminHubPostDetail(
  postId: string,
): Promise<HubPostDetailDto | null> {
  const prisma = getPrisma();
  const post = await prisma.hubPost.findFirst({
    where: { id: postId, deletedAt: null },
    include: {
      category: true,
      author: { include: { profile: true } },
      _count: hubActiveCommentsCount,
      comments: {
        where: { deletedAt: null },
        orderBy: { createdAt: "asc" },
        include: hubCommentIncludeAuthorAndLikes,
      },
      oversights: {
        orderBy: { version: "asc" },
      },
    },
  });
  if (!post) return null;
  const base = mapPostListItem(post as PostRowList);
  const oversightVersions: HubOversightVersionDto[] = post.oversights.map(
    (v) => ({
      id: v.id,
      postId: v.postId,
      version: v.version,
      summaryText: v.summaryText,
      suggestionsJson: v.suggestionsJson,
      legalCorpusVersion: v.legalCorpusVersion,
      modelVersion: v.modelVersion,
      isCurrent: v.isCurrent,
      createdAt: toIso(v.createdAt),
    }),
  );
  const comments: HubCommentDto[] = post.comments.map((c) =>
    mapCommentRowToDto(c as HubCommentAuthorRow),
  );
  return {
    ...base,
    body: post.body,
    comments,
    oversightVersions,
  };
}

export async function createHubComment(
  userId: string,
  postId: string,
  input: { body: string; parentId?: string | null },
): Promise<HubCommentDto> {
  const prisma = getPrisma();
  const post = await prisma.hubPost.findFirst({
    where: {
      id: postId,
      deletedAt: null,
      status: HubPostStatus.PUBLISHED,
    },
    select: { id: true },
  });
  if (!post) {
    throw new HttpError(
      HttpStatus.NOT_FOUND,
      "Post not found",
      ErrorCode.NOT_FOUND,
    );
  }

  const parentId =
    input.parentId === undefined || input.parentId === null || input.parentId === ""
      ? null
      : input.parentId;

  if (parentId) {
    const parent = await prisma.hubComment.findFirst({
      where: { id: parentId, postId, deletedAt: null },
      select: { id: true },
    });
    if (!parent) {
      throw new HttpError(
        HttpStatus.BAD_REQUEST,
        "Parent comment not found",
        ErrorCode.VALIDATION_ERROR,
      );
    }
    const depth = await hubCommentDepthFromRoot(parentId);
    if (depth < 0 || depth >= HUB_COMMENT_MAX_DEPTH) {
      throw new HttpError(
        HttpStatus.BAD_REQUEST,
        "Max reply depth exceeded",
        ErrorCode.VALIDATION_ERROR,
      );
    }
  }

  const created = await prisma.hubComment.create({
    data: {
      postId,
      authorId: userId,
      body: input.body,
      parentId,
    },
    include: hubCommentIncludeAuthorAndLikes,
  });
  return mapCommentRowToDto(created as HubCommentAuthorRow);
}

export async function updateHubComment(
  userId: string,
  postId: string,
  commentId: string,
  input: { body: string },
): Promise<HubCommentDto> {
  const prisma = getPrisma();
  const existing = await prisma.hubComment.findFirst({
    where: { id: commentId, postId, deletedAt: null },
    include: { author: { include: { profile: true } } },
  });
  if (!existing) {
    throw new HttpError(
      HttpStatus.NOT_FOUND,
      "Comment not found",
      ErrorCode.NOT_FOUND,
    );
  }
  if (existing.authorId !== userId) {
    throw new HttpError(
      HttpStatus.FORBIDDEN,
      ERROR_MESSAGES[ErrorCode.FORBIDDEN],
      ErrorCode.FORBIDDEN,
    );
  }

  const updated = await prisma.hubComment.update({
    where: { id: commentId },
    data: { body: input.body },
    include: hubCommentIncludeAuthorAndLikes,
  });
  return mapCommentRowToDto(updated as HubCommentAuthorRow);
}

export async function softDeleteHubComment(
  userId: string,
  postId: string,
  commentId: string,
): Promise<void> {
  const prisma = getPrisma();
  const existing = await prisma.hubComment.findFirst({
    where: { id: commentId, postId, deletedAt: null },
    select: { id: true, authorId: true },
  });
  if (!existing) {
    throw new HttpError(
      HttpStatus.NOT_FOUND,
      "Comment not found",
      ErrorCode.NOT_FOUND,
    );
  }
  if (existing.authorId !== userId) {
    throw new HttpError(
      HttpStatus.FORBIDDEN,
      ERROR_MESSAGES[ErrorCode.FORBIDDEN],
      ErrorCode.FORBIDDEN,
    );
  }
  await prisma.hubComment.update({
    where: { id: commentId },
    data: { deletedAt: new Date() },
  });
}

export async function adminSoftDeleteHubPost(postId: string): Promise<void> {
  const prisma = getPrisma();
  const existing = await prisma.hubPost.findFirst({
    where: { id: postId, deletedAt: null },
  });
  if (!existing) {
    throw new HttpError(
      HttpStatus.NOT_FOUND,
      "Post not found",
      ErrorCode.NOT_FOUND,
    );
  }
  await prisma.hubPost.update({
    where: { id: postId },
    data: { deletedAt: new Date() },
  });
}
