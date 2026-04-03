import { Router } from "express";
import blogScheduleController from "../controllers/blogSchedule.controller.js";

const blogScheduleRouter = Router();

blogScheduleRouter.patch("/status/:id", blogScheduleController.toggleStatus);
blogScheduleRouter.patch("/:id", blogScheduleController.updateSchedule);

export default blogScheduleRouter;
