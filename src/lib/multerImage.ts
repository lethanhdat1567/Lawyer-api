import { randomBytes } from "crypto";
import multer from "multer";
import { HttpError } from "./httpError.js";
import { ErrorCode } from "../constants/errorCodes.js";
import { HttpStatus } from "../constants/httpStatus.js";
import { getUploadStorePath } from "./uploadPaths.js";

const MAX_BYTES = Number(process.env.UPLOAD_MAX_BYTES) || 5 * 1024 * 1024;

const MIME_TO_EXT: Record<string, string> = {
  "image/jpeg": ".jpg",
  "image/png": ".png",
  "image/gif": ".gif",
  "image/webp": ".webp",
};

export const imageUpload = multer({
  storage: multer.diskStorage({
    destination: (_req, _file, cb) => {
      cb(null, getUploadStorePath());
    },
    filename: (_req, file, cb) => {
      const ext = MIME_TO_EXT[file.mimetype] ?? ".bin";
      cb(null, `${Date.now()}-${randomBytes(8).toString("hex")}${ext}`);
    },
  }),
  limits: { fileSize: MAX_BYTES },
  fileFilter: (_req, file, cb) => {
    if (!MIME_TO_EXT[file.mimetype]) {
      cb(
        new HttpError(
          HttpStatus.BAD_REQUEST,
          "Only JPEG, PNG, GIF, or WebP images are allowed",
          ErrorCode.VALIDATION_ERROR,
        ),
      );
      return;
    }
    cb(null, true);
  },
});
