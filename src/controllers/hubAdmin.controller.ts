import type { RequestHandler } from "express";
import { ErrorCode } from "../constants/errorCodes.js";
import { HttpStatus } from "../constants/httpStatus.js";
import hubAdminService from "../services/hub/hubAdmin.service.js";
import {
    hubAdminCreateSchema,
    hubAdminListQuerySchema,
    hubAdminPatchSchema,
} from "../validators/hub.schema.js";

class HubAdminController {
    getAdminHubPostById: RequestHandler = async (req, res, next) => {
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
            const post = await hubAdminService.getPostById(postId);
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

    getAdminHubPosts: RequestHandler = async (req, res, next) => {
        try {
            const q = hubAdminListQuerySchema.parse(req.query);
            const skip = (q.page - 1) * q.pageSize;
            const { items, total } = await hubAdminService.listPosts({
                q: q.q,
                categorySlug: q.categorySlug,
                sort: q.sort,
                status: q.status,
                authorId: q.authorId,
                skip,
                take: q.pageSize,
            });
            res.success({ items, total, page: q.page, pageSize: q.pageSize });
        } catch (e) {
            next(e);
        }
    };

    postAdminHubPost: RequestHandler = async (req, res, next) => {
        try {
            const body = hubAdminCreateSchema.parse(req.body);
            const item = await hubAdminService.createPost({
                authorId: body.authorId,
                title: body.title,
                body: body.body,
                categoryId: body.categoryId ?? null,
                status: body.status,
                slug: body.slug,
            });
            res.success({ post: item }, 201);
        } catch (e) {
            next(e);
        }
    };

    patchAdminHubPost: RequestHandler = async (req, res, next) => {
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
            const body = hubAdminPatchSchema.parse(req.body);
            const item = await hubAdminService.updatePost(postId, body);
            res.success({ post: item });
        } catch (e) {
            next(e);
        }
    };

    deleteAdminHubPost: RequestHandler = async (req, res, next) => {
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
            await hubAdminService.deletePost(postId);
            res.success({ ok: true });
        } catch (e) {
            next(e);
        }
    };
}

export default new HubAdminController();
