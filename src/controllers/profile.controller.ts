import type { RequestHandler } from "express";
import { profilePatchSchema } from "../validators/profile.schema.js";
import { updateUserProfile } from "../services/profile.service.js";

export const patchProfile: RequestHandler = async (req, res, next) => {
  try {
    if (!req.user) {
      res.unauthorization();
      return;
    }
    const body = profilePatchSchema.parse(req.body);
    const user = await updateUserProfile(req.user.id, body);
    res.success({ user });
  } catch (e) {
    next(e);
  }
};
