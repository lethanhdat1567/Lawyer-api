import type { RequestHandler } from "express";
import profileService from "../services/profile.service.js";

class MeController {
    getMe: RequestHandler = async (req, res, next) => {
        try {
            if (!req.user) {
                res.success({ user: null });
                return;
            }
            const user = await profileService.getUserMe(req.user.id);
            res.success({ user });
        } catch (e) {
            next(e);
        }
    };
}

export default new MeController();
