import type { RequestHandler } from "express";
import { ErrorCode } from "../constants/errorCodes.js";
import { HttpStatus } from "../constants/httpStatus.js";
import blogPublicService from "../services/blog/blogPublic.service.js";
import { blogPublicListQuerySchema } from "../validators/blog.schema.js";

class BlogPublicController {
    getBlogTags: RequestHandler = async (_req, res, next) => {
        try {
            const tags = await blogPublicService.listTags();
            res.success({ tags });
        } catch (e) {
            next(e);
        }
    };

    getBlogPosts: RequestHandler = async (req, res, next) => {
        try {
            const q = blogPublicListQuerySchema.parse(req.query);
            const skip = (q.page - 1) * q.pageSize;
            const { items, total } = await blogPublicService.listPublishedPosts({
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

    getBlogPostBySlug: RequestHandler = async (req, res, next) => {
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
            const post = await blogPublicService.getPublishedPostBySlug(slug);
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

export default new BlogPublicController();
