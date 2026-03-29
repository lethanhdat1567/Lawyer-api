import type { RequestHandler } from "express";
import {
  applyReputationDelta,
  listAdminReputationLedger,
} from "../services/reputation.service.js";
import {
  adminReputationAdjustBodySchema,
  adminReputationLedgerQuerySchema,
} from "../validators/reputation.schema.js";

export const postAdminReputationAdjust: RequestHandler = async (
  req,
  res,
  next,
) => {
  try {
    const body = adminReputationAdjustBodySchema.parse(req.body);
    const { score } = await applyReputationDelta({
      userId: body.userId,
      delta: body.delta,
      reason: body.reason,
      refHubCommentId: body.refHubCommentId,
      refBlogPostId: body.refBlogPostId,
      refBlogCommentId: body.refBlogCommentId,
    });
    res.success({ score });
  } catch (e) {
    next(e);
  }
};

export const getAdminReputationLedger: RequestHandler = async (
  req,
  res,
  next,
) => {
  try {
    const q = adminReputationLedgerQuerySchema.parse(req.query);
    const skip = (q.page - 1) * q.pageSize;
    const result = await listAdminReputationLedger({
      skip,
      take: q.pageSize,
      userId: q.userId,
    });
    res.success({
      items: result.items,
      total: result.total,
      page: q.page,
      pageSize: q.pageSize,
    });
  } catch (e) {
    next(e);
  }
};
