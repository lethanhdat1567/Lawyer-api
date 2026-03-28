import { getPrisma } from "../lib/prisma.js";

export async function getHealthStatus(): Promise<{
  status: "ok";
  database: "connected";
}> {
  await getPrisma().$queryRaw`SELECT 1`;
  return { status: "ok", database: "connected" };
}
