import { getPrisma } from "../lib/prisma.js";

class HealthService {
    async getHealthStatus(): Promise<{ status: "ok"; database: "connected" }> {
        await getPrisma().$queryRaw`SELECT 1`;
        return { status: "ok", database: "connected" };
    }
}

export default new HealthService();
