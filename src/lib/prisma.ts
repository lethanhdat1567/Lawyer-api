import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "../../generated/prisma/client.js";

let prisma: PrismaClient | null = null;

export function connectPrisma(): PrismaClient {
    if (prisma) {
        return prisma;
    }
    const url = process.env.DATABASE_URL;
    if (!url) {
        throw new Error("DATABASE_URL is required at runtime (set in .env)");
    }
    const adapter = new PrismaMariaDb(url);
    prisma = new PrismaClient({ adapter });
    return prisma;
}

export function getPrisma(): PrismaClient {
    if (!prisma) {
        throw new Error(
            "Prisma not initialized; call connectPrisma() before handling requests",
        );
    }
    return prisma;
}

export async function disconnectPrisma(): Promise<void> {
    if (prisma) {
        await prisma.$disconnect();
        prisma = null;
    }
}
