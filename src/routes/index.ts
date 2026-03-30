import { Router } from "express";
import { adminRoutesRouter } from "./groups/admin.route.js";
import { publicRoutesRouter } from "./groups/public.route.js";
import { systemRoutesRouter } from "./groups/system.route.js";
import { userRoutesRouter } from "./groups/user.route.js";

export const apiV1Router = Router();

apiV1Router.use(systemRoutesRouter);
apiV1Router.use(publicRoutesRouter);
apiV1Router.use(userRoutesRouter);
apiV1Router.use(adminRoutesRouter);
