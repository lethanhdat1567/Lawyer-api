import type { RequestHandler } from "express";
import { ErrorCode } from "../../constants/errorCodes.js";
import { HttpStatus } from "../../constants/httpStatus.js";
import adminVerificationsService from "../../services/admin/adminVerifications.service.js";
import {
    adminLawyerVerificationsQuerySchema,
    adminPatchLawyerVerificationBodySchema,
} from "../../validators/admin.schema.js";

class AdminVerificationsController {
    getLawyerVerifications: RequestHandler = async (req, res, next) => {
        try {
            const q = adminLawyerVerificationsQuerySchema.parse(req.query);
            const data = await adminVerificationsService.listLawyerVerifications({
                page: q.page,
                pageSize: q.pageSize,
                status: q.status,
            });
            res.success(data);
        } catch (e) {
            next(e);
        }
    };

    patchLawyerVerification: RequestHandler = async (req, res, next) => {
        try {
            if (!req.user) {
                res.unauthorization();
                return;
            }
            const id = String(req.params.id ?? "").trim();
            if (!id) {
                res.error({
                    code: ErrorCode.VALIDATION_ERROR,
                    message: "Missing verification id",
                    statusCode: HttpStatus.BAD_REQUEST,
                });
                return;
            }
            const body = adminPatchLawyerVerificationBodySchema.parse(req.body);
            const data = await adminVerificationsService.patchLawyerVerification(
                req.user.id,
                id,
                body,
            );
            res.success(data);
        } catch (e) {
            next(e);
        }
    };
}

export default new AdminVerificationsController();
