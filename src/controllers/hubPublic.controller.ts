import type { RequestHandler } from "express";
import { ErrorCode } from "../constants/errorCodes.js";
import { HttpStatus } from "../constants/httpStatus.js";
import hubPublicService from "../services/hub/hubPublic.service.js";
import { hubPublicListQuerySchema } from "../validators/hub.schema.js";

class HubPublicController {
    getHubCategories: RequestHandler = async (_req, res, next) => {
        try {
            const categories = await hubPublicService.listCategories();
            res.success({ categories });
        } catch (e) {
            next(e);
        }
    };

    getHubPosts: RequestHandler = async (req, res, next) => {
        try {
            const q = hubPublicListQuerySchema.parse(req.query);
            const skip = (q.page - 1) * q.pageSize;
            const { items, total } = await hubPublicService.listPosts({
                q: q.q,
                categorySlug: q.categorySlug,
                sort: q.sort,
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

    getHubPostBySlug: RequestHandler = async (req, res, next) => {
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
            const post = await hubPublicService.getPostBySlug(slug);
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
}

export default new HubPublicController();
