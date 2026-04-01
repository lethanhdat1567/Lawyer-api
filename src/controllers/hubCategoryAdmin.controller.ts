import type { RequestHandler } from "express";
import { ErrorCode } from "../constants/errorCodes.js";
import { HttpStatus } from "../constants/httpStatus.js";
import hubCategoryAdminService from "../services/hub/hubCategoryAdmin.service.js";
import {
    hubCategoryCreateSchema,
    hubCategoryPatchSchema,
} from "../validators/hub.schema.js";

class HubCategoryAdminController {
    postAdminHubCategory: RequestHandler = async (req, res, next) => {
        try {
            const body = hubCategoryCreateSchema.parse(req.body);
            const category = await hubCategoryAdminService.createCategory(body);
            res.success({ category }, 201);
        } catch (e) {
            next(e);
        }
    };

    patchAdminHubCategory: RequestHandler = async (req, res, next) => {
        try {
            const categoryId = String(req.params.id ?? "").trim();
            if (!categoryId) {
                res.error({
                    code: ErrorCode.VALIDATION_ERROR,
                    message: "Missing category id",
                    statusCode: HttpStatus.BAD_REQUEST,
                });
                return;
            }

            const body = hubCategoryPatchSchema.parse(req.body);
            const category = await hubCategoryAdminService.updateCategory(
                categoryId,
                body,
            );
            res.success({ category });
        } catch (e) {
            next(e);
        }
    };

    deleteAdminHubCategory: RequestHandler = async (req, res, next) => {
        try {
            const categoryId = String(req.params.id ?? "").trim();
            if (!categoryId) {
                res.error({
                    code: ErrorCode.VALIDATION_ERROR,
                    message: "Missing category id",
                    statusCode: HttpStatus.BAD_REQUEST,
                });
                return;
            }

            await hubCategoryAdminService.deleteCategory(categoryId);
            res.success({ ok: true });
        } catch (e) {
            next(e);
        }
    };
}

export default new HubCategoryAdminController();
