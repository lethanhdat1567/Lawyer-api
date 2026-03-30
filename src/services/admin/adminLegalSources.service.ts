import type { Prisma } from "../../../generated/prisma/client.js";
import { ErrorCode } from "../../constants/errorCodes.js";
import { HttpStatus } from "../../constants/httpStatus.js";
import { HttpError } from "../../lib/httpError.js";
import { getPrisma } from "../../lib/prisma.js";

class AdminLegalSourcesService {
    async listLegalSources(params: { page: number; pageSize: number; q?: string }) {
        const prisma = getPrisma();
        const where: Prisma.LegalSourceWhereInput = { deletedAt: null };
        if (params.q?.trim()) {
            const q = params.q.trim();
            where.OR = [{ title: { contains: q } }, { jurisdiction: { contains: q } }];
        }

        const skip = (params.page - 1) * params.pageSize;
        const [rows, total] = await Promise.all([
            prisma.legalSource.findMany({
                where,
                skip,
                take: params.pageSize,
                orderBy: { createdAt: "desc" },
            }),
            prisma.legalSource.count({ where }),
        ]);

        return {
            items: rows.map((r) => ({
                id: r.id,
                title: r.title,
                sourceUrl: r.sourceUrl,
                jurisdiction: r.jurisdiction,
                effectiveFrom: r.effectiveFrom?.toISOString() ?? null,
                effectiveTo: r.effectiveTo?.toISOString() ?? null,
                createdAt: r.createdAt.toISOString(),
                updatedAt: r.updatedAt.toISOString(),
            })),
            total,
            page: params.page,
            pageSize: params.pageSize,
        };
    }

    async createLegalSource(data: {
        title: string;
        sourceUrl?: string | null;
        jurisdiction?: string | null;
        effectiveFrom?: Date | null;
        effectiveTo?: Date | null;
    }) {
        const prisma = getPrisma();
        const row = await prisma.legalSource.create({
            data: {
                title: data.title,
                sourceUrl: data.sourceUrl ?? null,
                jurisdiction: data.jurisdiction ?? null,
                effectiveFrom: data.effectiveFrom ?? null,
                effectiveTo: data.effectiveTo ?? null,
            },
        });
        return {
            source: {
                id: row.id,
                title: row.title,
                sourceUrl: row.sourceUrl,
                jurisdiction: row.jurisdiction,
                effectiveFrom: row.effectiveFrom?.toISOString() ?? null,
                effectiveTo: row.effectiveTo?.toISOString() ?? null,
                createdAt: row.createdAt.toISOString(),
                updatedAt: row.updatedAt.toISOString(),
            },
        };
    }

    async patchLegalSource(
        id: string,
        data: {
            title?: string;
            sourceUrl?: string | null;
            jurisdiction?: string | null;
            effectiveFrom?: Date | null;
            effectiveTo?: Date | null;
        },
    ) {
        const prisma = getPrisma();
        const existing = await prisma.legalSource.findFirst({
            where: { id, deletedAt: null },
        });
        if (!existing) {
            throw new HttpError(
                HttpStatus.NOT_FOUND,
                "Legal source not found",
                ErrorCode.NOT_FOUND,
            );
        }
        const row = await prisma.legalSource.update({ where: { id }, data });
        return {
            source: {
                id: row.id,
                title: row.title,
                sourceUrl: row.sourceUrl,
                jurisdiction: row.jurisdiction,
                effectiveFrom: row.effectiveFrom?.toISOString() ?? null,
                effectiveTo: row.effectiveTo?.toISOString() ?? null,
                createdAt: row.createdAt.toISOString(),
                updatedAt: row.updatedAt.toISOString(),
            },
        };
    }

    async softDeleteLegalSource(id: string) {
        const prisma = getPrisma();
        const existing = await prisma.legalSource.findFirst({
            where: { id, deletedAt: null },
        });
        if (!existing) {
            throw new HttpError(
                HttpStatus.NOT_FOUND,
                "Legal source not found",
                ErrorCode.NOT_FOUND,
            );
        }
        await prisma.legalSource.update({
            where: { id },
            data: { deletedAt: new Date() },
        });
        return { ok: true as const };
    }
}

export default new AdminLegalSourcesService();
