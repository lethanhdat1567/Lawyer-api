import type { Prisma } from "../../../generated/prisma/client.js";
import { ReportStatus } from "../../../generated/prisma/enums.js";
import { ErrorCode } from "../../constants/errorCodes.js";
import { HttpStatus } from "../../constants/httpStatus.js";
import { HttpError } from "../../lib/httpError.js";
import { getPrisma } from "../../lib/prisma.js";

class AdminReportsService {
    async listReports(params: { page: number; pageSize: number; status?: ReportStatus }) {
        const prisma = getPrisma();
        const where: Prisma.ReportWhereInput = {};
        if (params.status) where.status = params.status;

        const skip = (params.page - 1) * params.pageSize;
        const [rows, total] = await Promise.all([
            prisma.report.findMany({
                where,
                skip,
                take: params.pageSize,
                orderBy: { createdAt: "desc" },
                include: {
                    reporter: {
                        select: {
                            id: true,
                            email: true,
                            profile: { select: { username: true, displayName: true } },
                        },
                    },
                    handledBy: {
                        select: {
                            id: true,
                            email: true,
                            profile: { select: { username: true } },
                        },
                    },
                },
            }),
            prisma.report.count({ where }),
        ]);

        return {
            items: rows.map((r) => ({
                id: r.id,
                reporterId: r.reporterId,
                targetType: r.targetType,
                targetId: r.targetId,
                reason: r.reason,
                status: r.status,
                handledByUserId: r.handledByUserId,
                createdAt: r.createdAt.toISOString(),
                updatedAt: r.updatedAt.toISOString(),
                reporter: {
                    id: r.reporter.id,
                    email: r.reporter.email,
                    username: r.reporter.profile?.username ?? null,
                    displayName: r.reporter.profile?.displayName ?? null,
                },
                handledBy: r.handledBy
                    ? {
                          id: r.handledBy.id,
                          email: r.handledBy.email,
                          username: r.handledBy.profile?.username ?? null,
                      }
                    : null,
            })),
            total,
            page: params.page,
            pageSize: params.pageSize,
        };
    }

    async patchReport(actorId: string, reportId: string, status: "ACTIONED" | "DISMISSED") {
        const prisma = getPrisma();
        const row = await prisma.report.findUnique({ where: { id: reportId } });
        if (!row) {
            throw new HttpError(HttpStatus.NOT_FOUND, "Report not found", ErrorCode.NOT_FOUND);
        }
        if (row.status !== ReportStatus.OPEN) {
            throw new HttpError(
                HttpStatus.BAD_REQUEST,
                "Only OPEN reports can be updated",
                ErrorCode.VALIDATION_ERROR,
            );
        }

        const updated = await prisma.report.update({
            where: { id: reportId },
            data: { status, handledByUserId: actorId },
        });

        return {
            report: {
                id: updated.id,
                status: updated.status,
                handledByUserId: updated.handledByUserId,
                createdAt: updated.createdAt.toISOString(),
                updatedAt: updated.updatedAt.toISOString(),
            },
        };
    }
}

export default new AdminReportsService();
