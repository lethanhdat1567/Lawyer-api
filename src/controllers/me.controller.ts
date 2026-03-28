import type { RequestHandler } from "express";
import { getUserMe } from "../services/profile.service.js";

export const getMe: RequestHandler = async (req, res, next) => {
  try {
    if (!req.user) {
      res.success({ user: null });
      return;
    }
    const user = await getUserMe(req.user.id);
    res.success({ user });
  } catch (e) {
    next(e);
  }
};
