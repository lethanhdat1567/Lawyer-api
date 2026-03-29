import type { RequestHandler } from "express";
import { ErrorCode } from "../constants/errorCodes.js";
import { HttpStatus } from "../constants/httpStatus.js";
import {
  getPublishedBlogPostBySlug,
  listPublicBlogTags,
  listPublishedBlogPosts,
} from "../services/blog.service.js";
import { blogPublicListQuerySchema } from "../validators/blog.schema.js";

export const getBlogTags: RequestHandler = async (_req, res, next) => {
  try {
    const tags = await listPublicBlogTags();
    res.success({ tags });
  } catch (e) {
    next(e);
  }
};

export const getBlogPosts: RequestHandler = async (req, res, next) => {
  try {
    const q = blogPublicListQuerySchema.parse(req.query);
    const skip = (q.page - 1) * q.pageSize;
    const { items, total } = await listPublishedBlogPosts({
      q: q.q,
      tagSlug: q.tagSlug,
      sort: q.sort,
      verifiedOnly: q.verifiedOnly,
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

export const getBlogPostBySlug: RequestHandler = async (req, res, next) => {
  try {
    const slug = String(req.params.slug ?? "").trim();
    if (!slug) {
      res.error({
        code: ErrorCode.VALIDATION_ERROR,
        message: "Missing slug",
        statusCode: HttpStatus.BAD_REQUEST,
      });
      return;
    }
    const post = await getPublishedBlogPostBySlug(slug);
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
