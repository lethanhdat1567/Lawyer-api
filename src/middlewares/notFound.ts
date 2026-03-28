import type { RequestHandler } from "express";
import { ErrorCode } from "../constants/errorCodes.js";
import { HttpStatus } from "../constants/httpStatus.js";
import { ERROR_MESSAGES } from "../constants/messages.js";

export const notFoundHandler: RequestHandler = (_req, res) => {
  res.error({
    code: ErrorCode.NOT_FOUND,
    message: ERROR_MESSAGES[ErrorCode.NOT_FOUND],
    statusCode: HttpStatus.NOT_FOUND,
  });
};
