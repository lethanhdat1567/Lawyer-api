import { Router } from "express";
import adminLegalSourcesController from "../../controllers/admin/adminLegalSources.controller.js";

export const adminLegalSourcesRouter = Router();

adminLegalSourcesRouter.get(
    "/legal-sources",
    adminLegalSourcesController.getLegalSources,
);
adminLegalSourcesRouter.post(
    "/legal-sources",
    adminLegalSourcesController.postLegalSource,
);
adminLegalSourcesRouter.patch(
    "/legal-sources/:id",
    adminLegalSourcesController.patchLegalSource,
);
adminLegalSourcesRouter.delete(
    "/legal-sources/:id",
    adminLegalSourcesController.deleteLegalSource,
);
