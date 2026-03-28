import type { RequestHandler } from "express";
import * as healthService from "../services/health.service.js";

export const getHealth: RequestHandler = async (_req, res, next) => {
  try {
    const body = await healthService.getHealthStatus();
    res.success(body);
  } catch (err) {
    next(err);
  }
};
