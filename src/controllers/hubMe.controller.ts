import type { RequestHandler } from "express";
import { ErrorCode } from "../constants/errorCodes.js";
import { HttpStatus } from "../constants/httpStatus.js";
import {
  batchHubCommentLikedByUser,
  toggleHubCommentLike,
} from "../services/commentLike.service.js";
import {
  createHubComment,
  createHubPostForUser,
  getMyHubPostDetail,
  listMyHubPosts,
  softDeleteHubComment,
  softDeleteMyHubPost,
  updateHubComment,
  updateMyHubPost,
} from "../services/hub.service.js";
import {
  hubCommentCreateBodySchema,
  hubCommentPatchBodySchema,
  hubPostCreateSchema,
  hubPostPatchSchema,
  hubPublicListQuerySchema,
} from "../validators/hub.schema.js";

export const getMyHubPostById: RequestHandler = async (req, res, next) => {
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
    const post = await getMyHubPostDetail(req.user.id, postId);
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

export const getMyHubPosts: RequestHandler = async (req, res, next) => {
  try {
    if (!req.user) {
      res.unauthorization();
      return;
    }
    const q = hubPublicListQuerySchema.parse(req.query);
    const skip = (q.page - 1) * q.pageSize;
    const { items, total } = await listMyHubPosts({
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

export const getMyHubCommentLikesBatch: RequestHandler = async (req, res, next) => {
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
    const items = await batchHubCommentLikedByUser({
      userId: req.user.id,
      commentIds,
    });
    res.success({ items });
  } catch (e) {
    next(e);
  }
};

export const postMyHubPost: RequestHandler = async (req, res, next) => {
  try {
    if (!req.user) {
      res.unauthorization();
      return;
    }
    const body = hubPostCreateSchema.parse(req.body);
    const item = await createHubPostForUser(req.user.id, {
      title: body.title,
      body: body.body,
      categoryId: body.categoryId ?? null,
      status: body.status,
    });
    res.success({ post: item }, 201);
  } catch (e) {
    next(e);
  }
};

export const patchMyHubPost: RequestHandler = async (req, res, next) => {
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
    const body = hubPostPatchSchema.parse(req.body);
    const item = await updateMyHubPost(req.user.id, postId, body);
    res.success({ post: item });
  } catch (e) {
    next(e);
  }
};

export const deleteMyHubPost: RequestHandler = async (req, res, next) => {
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
    await softDeleteMyHubPost(req.user.id, postId);
    res.success({ ok: true });
  } catch (e) {
    next(e);
  }
};

export const postMyHubPostComment: RequestHandler = async (req, res, next) => {
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
    const body = hubCommentCreateBodySchema.parse(req.body);
    const comment = await createHubComment(req.user.id, postId, {
      body: body.body,
      parentId: body.parentId ?? null,
    });
    res.success({ comment }, 201);
  } catch (e) {
    next(e);
  }
};

export const patchMyHubPostComment: RequestHandler = async (req, res, next) => {
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
    const body = hubCommentPatchBodySchema.parse(req.body);
    const comment = await updateHubComment(req.user.id, postId, commentId, {
      body: body.body,
    });
    res.success({ comment });
  } catch (e) {
    next(e);
  }
};

export const deleteMyHubPostComment: RequestHandler = async (req, res, next) => {
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
    await softDeleteHubComment(req.user.id, postId, commentId);
    res.success({ ok: true });
  } catch (e) {
    next(e);
  }
};

export const postMyHubPostCommentLike: RequestHandler = async (req, res, next) => {
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
    const result = await toggleHubCommentLike({
      actorUserId: req.user.id,
      postId,
      commentId,
    });
    res.success(result);
  } catch (e) {
    next(e);
  }
};
