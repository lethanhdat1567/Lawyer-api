import type { RequestHandler } from "express";
import { ErrorCode } from "../constants/errorCodes.js";
import { HttpStatus } from "../constants/httpStatus.js";
import {
  batchBlogCommentLikedByUser,
  toggleBlogCommentLike,
} from "../services/commentLike.service.js";
import {
  createBlogComment,
  createBlogPostForUser,
  getBlogPostEngagement,
  getBlogPostsEngagementBatch,
  getMyBlogPostById,
  listMyBlogPosts,
  listMySavedBlogPosts,
  softDeleteBlogComment,
  softDeleteMyBlogPost,
  toggleBlogPostLike,
  toggleSavedBlogPost,
  updateBlogComment,
  updateMyBlogPost,
} from "../services/blog.service.js";
import {
  blogCommentCreateBodySchema,
  blogCommentPatchBodySchema,
  blogMeCreateSchema,
  blogMePatchSchema,
  blogPublicListQuerySchema,
} from "../validators/blog.schema.js";

export const getMyBlogPostByIdHandler: RequestHandler = async (req, res, next) => {
  try {
    if (!req.user) {
      res.unauthorization();
      return;
    }
    const postId = String(req.params.id ?? "").trim();
    if (!postId) {
      res.error({
        code: ErrorCode.VALIDATION_ERROR,
        message: "Missing post id",
        statusCode: HttpStatus.BAD_REQUEST,
      });
      return;
    }
    const post = await getMyBlogPostById(req.user.id, postId);
    if (!post) {
      res.error({
        code: ErrorCode.NOT_FOUND,
        message: "Post not found",
        statusCode: HttpStatus.NOT_FOUND,
      });
      return;
    }
    res.success({ post });
  } catch (e) {
    next(e);
  }
};

export const getMyBlogPosts: RequestHandler = async (req, res, next) => {
  try {
    if (!req.user) {
      res.unauthorization();
      return;
    }
    const q = blogPublicListQuerySchema.parse(req.query);
    const skip = (q.page - 1) * q.pageSize;
    const { items, total } = await listMyBlogPosts({
      userId: req.user.id,
      skip,
      take: q.pageSize,
    });
    res.success({
      items,
      total,
      page: q.page,
      pageSize: q.pageSize,
    });
  } catch (e) {
    next(e);
  }
};

export const getMySavedBlogPosts: RequestHandler = async (req, res, next) => {
  try {
    if (!req.user) {
      res.unauthorization();
      return;
    }
    const q = blogPublicListQuerySchema.parse(req.query);
    const skip = (q.page - 1) * q.pageSize;
    const { items, total } = await listMySavedBlogPosts({
      userId: req.user.id,
      skip,
      take: q.pageSize,
    });
    res.success({
      items,
      total,
      page: q.page,
      pageSize: q.pageSize,
    });
  } catch (e) {
    next(e);
  }
};

export const getMyBlogEngagementBatch: RequestHandler = async (req, res, next) => {
  try {
    if (!req.user) {
      res.unauthorization();
      return;
    }
    const raw = String(req.query.ids ?? "").trim();
    const postIds = raw
      .split(/[\s,]+/)
      .map((s) => s.trim())
      .filter(Boolean)
      .slice(0, 48);
    const items = await getBlogPostsEngagementBatch(req.user.id, postIds);
    res.success({ items });
  } catch (e) {
    next(e);
  }
};

export const getMyBlogCommentLikesBatch: RequestHandler = async (req, res, next) => {
  try {
    if (!req.user) {
      res.unauthorization();
      return;
    }
    const raw = String(req.query.ids ?? "").trim();
    const commentIds = raw
      .split(/[\s,]+/)
      .map((s) => s.trim())
      .filter(Boolean)
      .slice(0, 48);
    const items = await batchBlogCommentLikedByUser({
      userId: req.user.id,
      commentIds,
    });
    res.success({ items });
  } catch (e) {
    next(e);
  }
};

export const postMyBlogPost: RequestHandler = async (req, res, next) => {
  try {
    if (!req.user) {
      res.unauthorization();
      return;
    }
    const body = blogMeCreateSchema.parse(req.body);
    const post = await createBlogPostForUser(req.user.id, {
      title: body.title,
      body: body.body,
      excerpt: body.excerpt,
      status: body.status,
      slug: body.slug,
      tagIds: body.tagIds,
    });
    res.success({ post }, 201);
  } catch (e) {
    next(e);
  }
};

export const patchMyBlogPost: RequestHandler = async (req, res, next) => {
  try {
    if (!req.user) {
      res.unauthorization();
      return;
    }
    const postId = String(req.params.id ?? "").trim();
    if (!postId) {
      res.error({
        code: ErrorCode.VALIDATION_ERROR,
        message: "Missing post id",
        statusCode: HttpStatus.BAD_REQUEST,
      });
      return;
    }
    const body = blogMePatchSchema.parse(req.body);
    const post = await updateMyBlogPost(req.user.id, postId, {
      title: body.title,
      body: body.body,
      excerpt: body.excerpt,
      thumbnailUrl: body.thumbnailUrl,
      status: body.status,
      slug: body.slug,
      tagIds: body.tagIds,
    });
    res.success({ post });
  } catch (e) {
    next(e);
  }
};

export const deleteMyBlogPost: RequestHandler = async (req, res, next) => {
  try {
    if (!req.user) {
      res.unauthorization();
      return;
    }
    const postId = String(req.params.id ?? "").trim();
    if (!postId) {
      res.error({
        code: ErrorCode.VALIDATION_ERROR,
        message: "Missing post id",
        statusCode: HttpStatus.BAD_REQUEST,
      });
      return;
    }
    await softDeleteMyBlogPost(req.user.id, postId);
    res.success({ ok: true });
  } catch (e) {
    next(e);
  }
};

export const postMyBlogPostComment: RequestHandler = async (req, res, next) => {
  try {
    if (!req.user) {
      res.unauthorization();
      return;
    }
    const postId = String(req.params.postId ?? "").trim();
    if (!postId) {
      res.error({
        code: ErrorCode.VALIDATION_ERROR,
        message: "Missing post id",
        statusCode: HttpStatus.BAD_REQUEST,
      });
      return;
    }
    const body = blogCommentCreateBodySchema.parse(req.body);
    const comment = await createBlogComment(req.user.id, postId, {
      body: body.body,
      parentId: body.parentId,
    });
    res.success({ comment }, 201);
  } catch (e) {
    next(e);
  }
};

export const patchMyBlogPostComment: RequestHandler = async (req, res, next) => {
  try {
    if (!req.user) {
      res.unauthorization();
      return;
    }
    const postId = String(req.params.postId ?? "").trim();
    const commentId = String(req.params.commentId ?? "").trim();
    if (!postId || !commentId) {
      res.error({
        code: ErrorCode.VALIDATION_ERROR,
        message: "Missing post or comment id",
        statusCode: HttpStatus.BAD_REQUEST,
      });
      return;
    }
    const body = blogCommentPatchBodySchema.parse(req.body);
    const comment = await updateBlogComment(req.user.id, postId, commentId, {
      body: body.body,
    });
    res.success({ comment });
  } catch (e) {
    next(e);
  }
};

export const deleteMyBlogPostComment: RequestHandler = async (req, res, next) => {
  try {
    if (!req.user) {
      res.unauthorization();
      return;
    }
    const postId = String(req.params.postId ?? "").trim();
    const commentId = String(req.params.commentId ?? "").trim();
    if (!postId || !commentId) {
      res.error({
        code: ErrorCode.VALIDATION_ERROR,
        message: "Missing post or comment id",
        statusCode: HttpStatus.BAD_REQUEST,
      });
      return;
    }
    await softDeleteBlogComment(req.user.id, postId, commentId);
    res.success({ ok: true });
  } catch (e) {
    next(e);
  }
};

export const postMyBlogPostCommentLike: RequestHandler = async (req, res, next) => {
  try {
    if (!req.user) {
      res.unauthorization();
      return;
    }
    const postId = String(req.params.postId ?? "").trim();
    const commentId = String(req.params.commentId ?? "").trim();
    if (!postId || !commentId) {
      res.error({
        code: ErrorCode.VALIDATION_ERROR,
        message: "Missing post or comment id",
        statusCode: HttpStatus.BAD_REQUEST,
      });
      return;
    }
    const result = await toggleBlogCommentLike({
      actorUserId: req.user.id,
      postId,
      commentId,
    });
    res.success(result);
  } catch (e) {
    next(e);
  }
};

export const getMyBlogPostEngagement: RequestHandler = async (req, res, next) => {
  try {
    if (!req.user) {
      res.unauthorization();
      return;
    }
    const postId = String(req.params.postId ?? "").trim();
    if (!postId) {
      res.error({
        code: ErrorCode.VALIDATION_ERROR,
        message: "Missing post id",
        statusCode: HttpStatus.BAD_REQUEST,
      });
      return;
    }
    const state = await getBlogPostEngagement(req.user.id, postId);
    res.success(state);
  } catch (e) {
    next(e);
  }
};

export const postMyBlogPostLike: RequestHandler = async (req, res, next) => {
  try {
    if (!req.user) {
      res.unauthorization();
      return;
    }
    const postId = String(req.params.postId ?? "").trim();
    if (!postId) {
      res.error({
        code: ErrorCode.VALIDATION_ERROR,
        message: "Missing post id",
        statusCode: HttpStatus.BAD_REQUEST,
      });
      return;
    }
    const result = await toggleBlogPostLike(req.user.id, postId);
    res.success(result);
  } catch (e) {
    next(e);
  }
};

export const postMyBlogPostSave: RequestHandler = async (req, res, next) => {
  try {
    if (!req.user) {
      res.unauthorization();
      return;
    }
    const postId = String(req.params.postId ?? "").trim();
    if (!postId) {
      res.error({
        code: ErrorCode.VALIDATION_ERROR,
        message: "Missing post id",
        statusCode: HttpStatus.BAD_REQUEST,
      });
      return;
    }
    const result = await toggleSavedBlogPost(req.user.id, postId);
    res.success(result);
  } catch (e) {
    next(e);
  }
};
