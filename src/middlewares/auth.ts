import type { RequestHandler } from "express";
import { ErrorCode } from "../constants/errorCodes.js";
import { HttpStatus } from "../constants/httpStatus.js";
import { ERROR_MESSAGES } from "../constants/messages.js";
import { HttpError } from "../lib/httpError.js";
import { UserRole } from "../../generated/prisma/enums.js";
import { verifyAccessTokenForRequest } from "../services/token.service.js";

export const authenticate: RequestHandler = (req, res, next) => {
  let token: string;
  try {
    token = extractBearer(req.headers.authorization);
  } catch {
    res.unauthorization();
    return;
  }

  try {
    req.user = verifyAccessTokenForRequest(token);
  } catch (e) {
    if (e instanceof HttpError) {
      res.error({
        code: e.code,
        message: e.message,
        statusCode: e.statusCode,
      });
      return;
    }
    res.unauthorization();
    return;
  }
  next();
};

export const optionalAuth: RequestHandler = (req, res, next) => {
  const auth = req.headers.authorization;
  if (!auth?.startsWith("Bearer ")) {
    req.user = undefined;
    next();
    return;
  }
  const token = auth.slice(7).trim();
  if (!token) {
    req.user = undefined;
    next();
    return;
  }

  try {
    req.user = verifyAccessTokenForRequest(token);
  } catch (e) {
    if (e instanceof HttpError) {
      next(e);
      return;
    }
    req.user = undefined;
  }
  next();
};

export const requireRole = (...allowed: UserRole[]): RequestHandler => {
  return (req, res, next) => {
    if (!req.user) {
      res.unauthorization();
      return;
    }
    if (!allowed.includes(req.user.role)) {
      res.error({
        code: ErrorCode.FORBIDDEN,
        message: ERROR_MESSAGES[ErrorCode.FORBIDDEN],
        statusCode: HttpStatus.FORBIDDEN,
      });
      return;
    }
    next();
  };
};

function extractBearer(authorization: string | undefined): string {
  if (!authorization?.startsWith("Bearer ")) {
    throw new Error("Missing bearer");
  }
  const token = authorization.slice(7).trim();
  if (!token) {
    throw new Error("Empty token");
  }
  return token;
}
