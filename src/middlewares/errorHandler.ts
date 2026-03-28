import type { ErrorRequestHandler } from "express";
import multer from "multer";
import { ZodError } from "zod";
import { ErrorCode } from "../constants/errorCodes.js";
import { HttpStatus } from "../constants/httpStatus.js";
import { ERROR_MESSAGES } from "../constants/messages.js";
import { HttpError } from "../lib/httpError.js";

export { HttpError } from "../lib/httpError.js";

export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  if (res.headersSent) {
    return;
  }

  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      res.error({
        code: ErrorCode.VALIDATION_ERROR,
        message: "File too large",
        statusCode: HttpStatus.BAD_REQUEST,
      });
      return;
    }
    res.error({
      code: ErrorCode.VALIDATION_ERROR,
      message: err.message,
      statusCode: HttpStatus.BAD_REQUEST,
    });
    return;
  }

  if (err instanceof ZodError) {
    res.error({
      code: ErrorCode.VALIDATION_ERROR,
      message: ERROR_MESSAGES[ErrorCode.VALIDATION_ERROR],
      statusCode: HttpStatus.BAD_REQUEST,
      details: err.flatten(),
    });
    return;
  }

  if (err instanceof HttpError) {
    res.error({
      code: err.code,
      message: err.message,
      statusCode: err.statusCode,
    });
    return;
  }

  console.error(err);
  res.error({
    code: ErrorCode.INTERNAL_ERROR,
    message: ERROR_MESSAGES[ErrorCode.INTERNAL_ERROR],
    statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
  });
};
