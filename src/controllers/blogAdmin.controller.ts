import type { RequestHandler } from "express";
import { ErrorCode } from "../constants/errorCodes.js";
import { HttpStatus } from "../constants/httpStatus.js";
import blogAdminService from "../services/blog/blogAdmin.service.js";
import {
    blogAdminCreateSchema,
    blogAdminListQuerySchema,
    blogAdminPatchSchema,
    blogAdminVerificationPatchSchema,
    blogTagAdminCreateSchema,
    blogTagAdminPatchSchema,
} from "../validators/blog.schema.js";

class BlogAdminController {
    postAdminBlogTag: RequestHandler = async (req, res, next) => {
        try {
            const body = blogTagAdminCreateSchema.parse(req.body);
            const tag = await blogAdminService.createTag(body);
            res.success({ tag }, 201);
        } catch (e) {
            next(e);
        }
    };

    patchAdminBlogTag: RequestHandler = async (req, res, next) => {
        try {
            const tagId = String(req.params.id ?? "").trim();
            if (!tagId) {
                res.error({
                    code: ErrorCode.VALIDATION_ERROR,
                    message: "Missing tag id",
                    statusCode: HttpStatus.BAD_REQUEST,
                });
                return;
            }
            const body = blogTagAdminPatchSchema.parse(req.body);
            const tag = await blogAdminService.updateTag(tagId, body);
            res.success({ tag });
        } catch (e) {
            next(e);
        }
    };

    deleteAdminBlogTag: RequestHandler = async (req, res, next) => {
        try {
            const tagId = String(req.params.id ?? "").trim();
            if (!tagId) {
                res.error({
                    code: ErrorCode.VALIDATION_ERROR,
                    message: "Missing tag id",
                    statusCode: HttpStatus.BAD_REQUEST,
                });
                return;
            }
            await blogAdminService.deleteTag(tagId);
            res.success({ ok: true });
        } catch (e) {
            next(e);
        }
    };

    getAdminBlogPostByIdHandler: RequestHandler = async (req, res, next) => {
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
            const post = await blogAdminService.getPostById(postId);
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

    getAdminBlogPosts: RequestHandler = async (req, res, next) => {
        try {
            const q = blogAdminListQuerySchema.parse(req.query);
            const skip = (q.page - 1) * q.pageSize;
            const { items, total } = await blogAdminService.listPosts({
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

    postAdminBlogPost: RequestHandler = async (req, res, next) => {
        try {
            const body = blogAdminCreateSchema.parse(req.body);
            const post = await blogAdminService.createPost({
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

    patchAdminBlogPost: RequestHandler = async (req, res, next) => {
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
            const post = await blogAdminService.updatePost(postId, req.user.id, {
                title: body.title,
                body: body.body,
                excerpt: body.excerpt,
                thumbnailUrl: body.thumbnailUrl,
                status: body.status,
                slug: body.slug,
                authorId: body.authorId,
                tagIds: body.tagIds,
            });
            res.success({ post });
        } catch (e) {
            next(e);
        }
    };

    patchAdminBlogPostVerification: RequestHandler = async (req, res, next) => {
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
            const body = blogAdminVerificationPatchSchema.parse(req.body);
            const post = await blogAdminService.updatePostVerification(
                postId,
                req.user.id,
                {
                    isVerified: body.isVerified,
                    verificationNotes: body.verificationNotes,
                },
            );
            res.success({ post });
        } catch (e) {
            next(e);
        }
    };

    deleteAdminBlogPost: RequestHandler = async (req, res, next) => {
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
            await blogAdminService.deletePost(postId);
            res.success({ ok: true });
        } catch (e) {
            next(e);
        }
    };
}

export default new BlogAdminController();
