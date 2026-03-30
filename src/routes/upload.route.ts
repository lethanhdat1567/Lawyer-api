import { Router } from "express";
import uploadController from "../controllers/upload.controller.js";
import { authenticate } from "../middlewares/auth.js";
import { imageUpload } from "../lib/multerImage.js";

export const uploadRouter = Router();

uploadRouter.post(
    "/image",
    authenticate,
    imageUpload.single("file"),
    uploadController.postImage,
);
