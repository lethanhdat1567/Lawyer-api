import { Router } from "express";
import adminCrawlController from "../../controllers/admin/adminCrawl.controller.js";

export const adminCrawlRouter = Router();

adminCrawlRouter.post("/crawl-draft", adminCrawlController.postCrawlDraft);
adminCrawlRouter.post("/crawl-approve", adminCrawlController.postCrawlApprove);
