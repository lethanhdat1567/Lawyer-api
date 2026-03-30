import type { RequestHandler } from "express";
import healthService from "../services/health.service.js";

class HealthController {
    getHealth: RequestHandler = async (_req, res, next) => {
        try {
            const body = await healthService.getHealthStatus();
            res.success(body);
        } catch (err) {
            next(err);
        }
    };
}

export default new HealthController();
