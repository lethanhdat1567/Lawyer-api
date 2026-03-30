import type { RequestHandler } from "express";
import profileService from "../services/profile.service.js";
import { profilePatchSchema } from "../validators/profile.schema.js";

class ProfileController {
    patchProfile: RequestHandler = async (req, res, next) => {
        try {
            if (!req.user) {
                res.unauthorization();
                return;
            }
            const body = profilePatchSchema.parse(req.body);
            const user = await profileService.updateUserProfile(req.user.id, body);
            res.success({ user });
        } catch (e) {
            next(e);
        }
    };
}

export default new ProfileController();
