import { Router } from "express";
import { blogAdminRouter } from "../blogAdmin.route.js";
import { hubAdminRouter } from "../hubAdmin.route.js";
import { hubCategoryAdminRouter } from "../hubCategoryAdmin.route.js";
import { adminRouter } from "../admin/index.js";
import { authenticate, requireRole } from "../../middlewares/auth.js";
import { UserRole } from "../../../generated/prisma/enums.js";

export const adminRoutesRouter = Router();

adminRoutesRouter.use(
    "/admin/hub/categories",
    authenticate,
    requireRole(UserRole.ADMIN),
    hubCategoryAdminRouter,
);
adminRoutesRouter.use(
    "/admin/hub",
    authenticate,
    requireRole(UserRole.ADMIN),
    hubAdminRouter,
);
adminRoutesRouter.use(
    "/admin/blog",
    authenticate,
    requireRole(UserRole.ADMIN),
    blogAdminRouter,
);
adminRoutesRouter.use(
    "/admin",
    authenticate,
    requireRole(UserRole.ADMIN),
    adminRouter,
);
