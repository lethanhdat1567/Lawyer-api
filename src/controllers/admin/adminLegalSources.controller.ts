import type { RequestHandler } from "express";
import { ErrorCode } from "../../constants/errorCodes.js";
import { HttpStatus } from "../../constants/httpStatus.js";
import adminLegalSourcesService from "../../services/admin/adminLegalSources.service.js";
import {
    adminCreateLegalSourceBodySchema,
    adminLegalSourcesQuerySchema,
    adminPatchLegalSourceBodySchema,
} from "../../validators/admin.schema.js";

class AdminLegalSourcesController {
    getLegalSources: RequestHandler = async (req, res, next) => {
        try {
            const q = adminLegalSourcesQuerySchema.parse(req.query);
            const data = await adminLegalSourcesService.listLegalSources({
                page: q.page,
                pageSize: q.pageSize,
                q: q.q,
            });
            res.success(data);
        } catch (e) {
            next(e);
        }
    };

    postLegalSource: RequestHandler = async (req, res, next) => {
        try {
            const body = adminCreateLegalSourceBodySchema.parse(req.body);
            const data = await adminLegalSourcesService.createLegalSource({
                title: body.title,
                sourceUrl: body.sourceUrl,
                jurisdiction: body.jurisdiction,
                effectiveFrom: body.effectiveFrom ?? null,
                effectiveTo: body.effectiveTo ?? null,
            });
            res.success(data, 201);
        } catch (e) {
            next(e);
        }
    };

    patchLegalSource: RequestHandler = async (req, res, next) => {
        try {
            const id = String(req.params.id ?? "").trim();
            if (!id) {
                res.error({
                    code: ErrorCode.VALIDATION_ERROR,
                    message: "Missing legal source id",
                    statusCode: HttpStatus.BAD_REQUEST,
                });
                return;
            }
            const body = adminPatchLegalSourceBodySchema.parse(req.body);
            const data = await adminLegalSourcesService.patchLegalSource(id, body);
            res.success(data);
        } catch (e) {
            next(e);
        }
    };

    deleteLegalSource: RequestHandler = async (req, res, next) => {
        try {
            const id = String(req.params.id ?? "").trim();
            if (!id) {
                res.error({
                    code: ErrorCode.VALIDATION_ERROR,
                    message: "Missing legal source id",
                    statusCode: HttpStatus.BAD_REQUEST,
                });
                return;
            }
            const data = await adminLegalSourcesService.softDeleteLegalSource(id);
            res.success(data);
        } catch (e) {
            next(e);
        }
    };
}

export default new AdminLegalSourcesController();
