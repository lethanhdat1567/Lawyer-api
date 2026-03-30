import type { RequestHandler } from "express";
import { ErrorCode } from "../constants/errorCodes.js";
import { HttpStatus } from "../constants/httpStatus.js";
import profileService from "../services/profile.service.js";

class ProfilePublicController {
    getPublicProfile: RequestHandler = async (req, res, next) => {
        try {
            const raw = String(req.params.username ?? "");
            const profile = await profileService.getPublicProfileByUsername(raw);
            if (!profile) {
                res.error({
                    code: ErrorCode.NOT_FOUND,
                    message: "Profile not found",
                    statusCode: HttpStatus.NOT_FOUND,
                });
                return;
            }
            res.success({ profile });
        } catch (e) {
            next(e);
        }
    };
}

export default new ProfilePublicController();
