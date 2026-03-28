import rateLimit from "express-rate-limit";
import { ErrorCode } from "../constants/errorCodes.js";
import { HttpStatus } from "../constants/httpStatus.js";
import { ERROR_MESSAGES } from "../constants/messages.js";

const DEFAULT_WINDOW_MS = 15 * 60 * 1000;
const DEFAULT_MAX = 300;

const AUTH_DEFAULT_WINDOW_MS = 15 * 60 * 1000;
const AUTH_DEFAULT_MAX = 60;

/** Stricter limit for /auth/* (login, register, refresh, firebase, forgot). */
export function createAuthRateLimiter() {
  const windowMs =
    Number(process.env.AUTH_RATE_LIMIT_WINDOW_MS) || AUTH_DEFAULT_WINDOW_MS;
  const max = Number(process.env.AUTH_RATE_LIMIT_MAX) || AUTH_DEFAULT_MAX;
  return rateLimit({
    windowMs,
    max,
    standardHeaders: true,
    legacyHeaders: false,
    handler: (_req, res) => {
      res.error({
        code: ErrorCode.RATE_LIMITED,
        message: ERROR_MESSAGES[ErrorCode.RATE_LIMITED],
        statusCode: HttpStatus.TOO_MANY_REQUESTS,
      });
    },
  });
}

export function createApiRateLimiter() {
  const windowMs =
    Number(process.env.RATE_LIMIT_WINDOW_MS) || DEFAULT_WINDOW_MS;
  const max = Number(process.env.RATE_LIMIT_MAX) || DEFAULT_MAX;

  return rateLimit({
    windowMs,
    max,
    standardHeaders: true,
    legacyHeaders: false,
    handler: (_req, res) => {
      res.error({
        code: ErrorCode.RATE_LIMITED,
        message: ERROR_MESSAGES[ErrorCode.RATE_LIMITED],
        statusCode: HttpStatus.TOO_MANY_REQUESTS,
      });
    },
  });
}
