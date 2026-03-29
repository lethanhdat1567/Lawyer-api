import type { RequestHandler } from "express";
import { listPublicContributorsLeaderboard } from "../services/reputation.service.js";
import { contributorsLeaderboardQuerySchema } from "../validators/reputation.schema.js";

export const getContributorsLeaderboard: RequestHandler = async (
  req,
  res,
  next,
) => {
  try {
    const q = contributorsLeaderboardQuerySchema.parse(req.query);
    const data = await listPublicContributorsLeaderboard({ limit: q.limit });
    res.success(data);
  } catch (e) {
    next(e);
  }
};
