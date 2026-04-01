import type { RequestHandler } from "express";
import lawyerVerificationService from "../services/lawyerVerification.service.js";
import {
    lawyerVerificationCreateSchema,
    lawyerVerificationPatchSchema,
} from "../validators/lawyerVerification.schema.js";

class LawyerVerificationController {
    getMyVerification: RequestHandler = async (req, res, next) => {
        try {
            if (!req.user) {
                res.unauthorization();
                return;
            }

            const verification = await lawyerVerificationService.getMyVerification(
                req.user.id,
            );
            res.success({ verification });
        } catch (e) {
            next(e);
        }
    };

    postMyVerification: RequestHandler = async (req, res, next) => {
        try {
            if (!req.user) {
                res.unauthorization();
                return;
            }

            const body = lawyerVerificationCreateSchema.parse(req.body);
            const verification = await lawyerVerificationService.createMyVerification(
                req.user.id,
                body,
            );
            res.success({ verification }, 201);
        } catch (e) {
            next(e);
        }
    };

    patchMyVerification: RequestHandler = async (req, res, next) => {
        try {
            if (!req.user) {
                res.unauthorization();
                return;
            }

            const body = lawyerVerificationPatchSchema.parse(req.body);
            const verification = await lawyerVerificationService.updateMyVerification(
                req.user.id,
                body,
            );
            res.success({ verification });
        } catch (e) {
            next(e);
        }
    };
}

export default new LawyerVerificationController();
