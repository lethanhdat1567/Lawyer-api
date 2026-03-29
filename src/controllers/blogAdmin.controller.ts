import type { RequestHandler } from "express";
import { ErrorCode } from "../constants/errorCodes.js";
import { HttpStatus } from "../constants/httpStatus.js";
import {
  adminCreateBlogPost,
  adminListBlogPosts,
  adminSoftDeleteBlogPost,
  adminUpdateBlogPost,
  getAdminBlogPostById,
} from "../services/blog.service.js";
import {
  blogAdminCreateSchema,
  blogAdminListQuerySchema,
  blogAdminPatchSchema,
} from "../validators/blog.schema.js";

export const getAdminBlogPostByIdHandler: RequestHandler = async (
  req,
  res,
  next,
) => {
  try {
    const postId = String(req.params.id ?? "").trim();
    if (!postId) {
      res.error({
        code: ErrorCode.VALIDATION_ERROR,
        message: "Missing post id",
        statusCode: HttpStatus.BAD_REQUEST,
      });
      return;
    }
    const post = await getAdminBlogPostById(postId);
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

export const getAdminBlogPosts: RequestHandler = async (req, res, next) => {
  try {
    const q = blogAdminListQuerySchema.parse(req.query);
    const skip = (q.page - 1) * q.pageSize;
    const { items, total } = await adminListBlogPosts({
      q: q.q,
      tagSlug: q.tagSlug,
      sort: q.sort,
      verifiedOnly: q.verifiedOnly,
      status: q.status,
      authorId: q.authorId,
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

export const postAdminBlogPost: RequestHandler = async (req, res, next) => {
  try {
    const body = blogAdminCreateSchema.parse(req.body);
    const post = await adminCreateBlogPost({
      authorId: body.authorId,
      title: body.title,
      body: body.body,
      excerpt: body.excerpt,
      thumbnailUrl: body.thumbnailUrl,
      status: body.status,
      slug: body.slug,
      tagIds: body.tagIds,
    });
    res.success({ post }, 201);
  } catch (e) {
    next(e);
  }
};

export const patchAdminBlogPost: RequestHandler = async (req, res, next) => {
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
    const body = blogAdminPatchSchema.parse(req.body);
    const post = await adminUpdateBlogPost(postId, req.user.id, {
      title: body.title,
      body: body.body,
      excerpt: body.excerpt,
      thumbnailUrl: body.thumbnailUrl,
      status: body.status,
      slug: body.slug,
      authorId: body.authorId,
      tagIds: body.tagIds,
      isVerified: body.isVerified,
      verificationNotes: body.verificationNotes,
      legalCorpusVersion: body.legalCorpusVersion,
    });
    res.success({ post });
  } catch (e) {
    next(e);
  }
};

export const deleteAdminBlogPost: RequestHandler = async (req, res, next) => {
  try {
    const postId = String(req.params.id ?? "").trim();
    if (!postId) {
      res.error({
        code: ErrorCode.VALIDATION_ERROR,
        message: "Missing post id",
        statusCode: HttpStatus.BAD_REQUEST,
      });
      return;
    }
    await adminSoftDeleteBlogPost(postId);
    res.success({ ok: true });
  } catch (e) {
    next(e);
  }
};
