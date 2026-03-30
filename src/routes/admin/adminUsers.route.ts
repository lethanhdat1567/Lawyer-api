import { Router } from "express";
import adminUsersController from "../../controllers/admin/adminUsers.controller.js";

export const adminUsersRouter = Router();

adminUsersRouter.get("/users", adminUsersController.getUsers);
adminUsersRouter.patch("/users/:id", adminUsersController.patchUser);
