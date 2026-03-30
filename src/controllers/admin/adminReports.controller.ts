import type { RequestHandler } from "express";
import { ErrorCode } from "../../constants/errorCodes.js";
import { HttpStatus } from "../../constants/httpStatus.js";
import adminReportsService from "../../services/admin/adminReports.service.js";
import {
    adminPatchReportBodySchema,
    adminReportsListQuerySchema,
} from "../../validators/admin.schema.js";

class AdminReportsController {
    getReports: RequestHandler = async (req, res, next) => {
        try {
            const q = adminReportsListQuerySchema.parse(req.query);
            const data = await adminReportsService.listReports({
                page: q.page,
                pageSize: q.pageSize,
                status: q.status,
            });
            res.success(data);
        } catch (e) {
            next(e);
        }
    };

    patchReport: RequestHandler = async (req, res, next) => {
        try {
            if (!req.user) {
                res.unauthorization();
                return;
            }
            const id = String(req.params.id ?? "").trim();
            if (!id) {
                res.error({
                    code: ErrorCode.VALIDATION_ERROR,
                    message: "Missing report id",
                    statusCode: HttpStatus.BAD_REQUEST,
                });
                return;
            }
            const body = adminPatchReportBodySchema.parse(req.body);
            const data = await adminReportsService.patchReport(
                req.user.id,
                id,
                body.status,
            );
            res.success(data);
        } catch (e) {
            next(e);
        }
    };
}

export default new AdminReportsController();
