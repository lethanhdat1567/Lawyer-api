import type { RequestHandler } from "express";
import { ErrorCode } from "../../constants/errorCodes.js";
import { HttpStatus } from "../../constants/httpStatus.js";
import adminUsersService from "../../services/admin/adminUsers.service.js";
import {
    adminPatchUserBodySchema,
    adminUsersListQuerySchema,
} from "../../validators/admin.schema.js";

class AdminUsersController {
    getUsers: RequestHandler = async (req, res, next) => {
        try {
            const q = adminUsersListQuerySchema.parse(req.query);
            const data = await adminUsersService.listUsers({
                page: q.page,
                pageSize: q.pageSize,
                q: q.q,
                role: q.role,
            });
            res.success(data);
        } catch (e) {
            next(e);
        }
    };

    patchUser: RequestHandler = async (req, res, next) => {
        try {
            if (!req.user) {
                res.unauthorization();
                return;
            }
            const targetId = String(req.params.id ?? "").trim();
            if (!targetId) {
                res.error({
                    code: ErrorCode.VALIDATION_ERROR,
                    message: "Missing user id",
                    statusCode: HttpStatus.BAD_REQUEST,
                });
                return;
            }
            const body = adminPatchUserBodySchema.parse(req.body);
            const data = await adminUsersService.patchUserRole(
                req.user.id,
                targetId,
                body.role,
            );
            res.success(data);
        } catch (e) {
            next(e);
        }
    };
}

export default new AdminUsersController();
