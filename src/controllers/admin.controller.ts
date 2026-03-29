import type { RequestHandler } from "express";
import { ErrorCode } from "../constants/errorCodes.js";
import { HttpStatus } from "../constants/httpStatus.js";
import {
  adminCreateLegalSource,
  adminListLawyerVerifications,
  adminListLeaderboard,
  adminListLegalSources,
  adminListReports,
  adminListUsers,
  adminPatchLawyerVerification,
  adminPatchLegalSource,
  adminPatchReport,
  adminPatchUserRole,
  adminSoftDeleteLegalSource,
  getAdminStats,
} from "../services/admin.service.js";
import {
  adminCreateLegalSourceBodySchema,
  adminLawyerVerificationsQuerySchema,
  adminLeaderboardQuerySchema,
  adminLegalSourcesQuerySchema,
  adminPatchLawyerVerificationBodySchema,
  adminPatchLegalSourceBodySchema,
  adminPatchReportBodySchema,
  adminPatchUserBodySchema,
  adminReportsListQuerySchema,
  adminUsersListQuerySchema,
} from "../validators/admin.schema.js";

export const getAdminStatsHandler: RequestHandler = async (req, res, next) => {
  try {
    const data = await getAdminStats();
    res.success({ stats: data });
  } catch (e) {
    next(e);
  }
};

export const getAdminUsers: RequestHandler = async (req, res, next) => {
  try {
    const q = adminUsersListQuerySchema.parse(req.query);
    const data = await adminListUsers({
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

export const patchAdminUser: RequestHandler = async (req, res, next) => {
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
    const data = await adminPatchUserRole(req.user.id, targetId, body.role);
    res.success(data);
  } catch (e) {
    next(e);
  }
};

export const getAdminLawyerVerifications: RequestHandler = async (
  req,
  res,
  next,
) => {
  try {
    const q = adminLawyerVerificationsQuerySchema.parse(req.query);
    const data = await adminListLawyerVerifications({
      page: q.page,
      pageSize: q.pageSize,
      status: q.status,
    });
    res.success(data);
  } catch (e) {
    next(e);
  }
};

export const patchAdminLawyerVerification: RequestHandler = async (
  req,
  res,
  next,
) => {
  try {
    if (!req.user) {
      res.unauthorization();
      return;
    }
    const id = String(req.params.id ?? "").trim();
    if (!id) {
      res.error({
        code: ErrorCode.VALIDATION_ERROR,
        message: "Missing verification id",
        statusCode: HttpStatus.BAD_REQUEST,
      });
      return;
    }
    const body = adminPatchLawyerVerificationBodySchema.parse(req.body);
    const data = await adminPatchLawyerVerification(req.user.id, id, body);
    res.success(data);
  } catch (e) {
    next(e);
  }
};

export const getAdminReports: RequestHandler = async (req, res, next) => {
  try {
    const q = adminReportsListQuerySchema.parse(req.query);
    const data = await adminListReports({
      page: q.page,
      pageSize: q.pageSize,
      status: q.status,
    });
    res.success(data);
  } catch (e) {
    next(e);
  }
};

export const patchAdminReport: RequestHandler = async (req, res, next) => {
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
    const data = await adminPatchReport(req.user.id, id, body.status);
    res.success(data);
  } catch (e) {
    next(e);
  }
};

export const getAdminLeaderboard: RequestHandler = async (req, res, next) => {
  try {
    const q = adminLeaderboardQuerySchema.parse(req.query);
    const data = await adminListLeaderboard({
      limit: q.limit,
      offset: q.offset,
    });
    res.success(data);
  } catch (e) {
    next(e);
  }
};

export const getAdminLegalSources: RequestHandler = async (req, res, next) => {
  try {
    const q = adminLegalSourcesQuerySchema.parse(req.query);
    const data = await adminListLegalSources({
      page: q.page,
      pageSize: q.pageSize,
      q: q.q,
    });
    res.success(data);
  } catch (e) {
    next(e);
  }
};

export const postAdminLegalSource: RequestHandler = async (req, res, next) => {
  try {
    const body = adminCreateLegalSourceBodySchema.parse(req.body);
    const data = await adminCreateLegalSource({
      title: body.title,
      sourceUrl: body.sourceUrl,
      jurisdiction: body.jurisdiction,
      effectiveFrom: body.effectiveFrom ?? null,
      effectiveTo: body.effectiveTo ?? null,
    });
    res.success(data, 201);
  } catch (e) {
    next(e);
  }
};

export const patchAdminLegalSource: RequestHandler = async (
  req,
  res,
  next,
) => {
  try {
    const id = String(req.params.id ?? "").trim();
    if (!id) {
      res.error({
        code: ErrorCode.VALIDATION_ERROR,
        message: "Missing legal source id",
        statusCode: HttpStatus.BAD_REQUEST,
      });
      return;
    }
    const body = adminPatchLegalSourceBodySchema.parse(req.body);
    const data = await adminPatchLegalSource(id, body);
    res.success(data);
  } catch (e) {
    next(e);
  }
};

export const deleteAdminLegalSource: RequestHandler = async (
  req,
  res,
  next,
) => {
  try {
    const id = String(req.params.id ?? "").trim();
    if (!id) {
      res.error({
        code: ErrorCode.VALIDATION_ERROR,
        message: "Missing legal source id",
        statusCode: HttpStatus.BAD_REQUEST,
      });
      return;
    }
    const data = await adminSoftDeleteLegalSource(id);
    res.success(data);
  } catch (e) {
    next(e);
  }
};
