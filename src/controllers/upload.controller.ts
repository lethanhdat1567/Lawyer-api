import type { RequestHandler } from "express";
import { ErrorCode } from "../constants/errorCodes.js";
import { HttpStatus } from "../constants/httpStatus.js";

export const postImage: RequestHandler = (req, res, next) => {
  try {
    if (!req.file?.filename) {
      res.error({
        code: ErrorCode.VALIDATION_ERROR,
        message: "Missing file (field name: file)",
        statusCode: HttpStatus.BAD_REQUEST,
      });
      return;
    }
    res.success({ url: `/upload/${req.file.filename}` });
  } catch (e) {
    next(e);
  }
};
