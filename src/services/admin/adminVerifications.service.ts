import type { Prisma } from "../../../generated/prisma/client.js";
import { LawyerVerificationStatus, UserRole } from "../../../generated/prisma/enums.js";
import { ErrorCode } from "../../constants/errorCodes.js";
import { HttpStatus } from "../../constants/httpStatus.js";
import { HttpError } from "../../lib/httpError.js";
import { getPrisma } from "../../lib/prisma.js";

class AdminVerificationsService {
    async listLawyerVerifications(params: {
        page: number;
        pageSize: number;
        status?: LawyerVerificationStatus;
    }) {
        const prisma = getPrisma();
        const where: Prisma.LawyerVerificationWhereInput = { deletedAt: null };
        if (params.status) where.status = params.status;

        const skip = (params.page - 1) * params.pageSize;
        const [rows, total] = await Promise.all([
            prisma.lawyerVerification.findMany({
                where,
                skip,
                take: params.pageSize,
                orderBy: { createdAt: "desc" },
                include: {
                    user: {
                        select: {
                            id: true,
                            email: true,
                            role: true,
                            profile: { select: { username: true, displayName: true } },
                        },
                    },
                    reviewedBy: {
                        select: {
                            email: true,
                            profile: { select: { username: true } },
                        },
                    },
                },
            }),
            prisma.lawyerVerification.count({ where }),
        ]);

        return {
            items: rows.map((r) => ({
                id: r.id,
                userId: r.userId,
                status: r.status,
                jurisdiction: r.jurisdiction,
                barNumber: r.barNumber,
                firmName: r.firmName,
                evidenceJson: r.evidenceJson,
                note: r.note,
                reviewedAt: r.reviewedAt?.toISOString() ?? null,
                reviewedByUserId: r.reviewedByUserId,
                createdAt: r.createdAt.toISOString(),
                updatedAt: r.updatedAt.toISOString(),
                user: {
                    id: r.user.id,
                    email: r.user.email,
                    role: r.user.role,
                    username: r.user.profile?.username ?? null,
                    displayName: r.user.profile?.displayName ?? null,
                },
                reviewedBy: r.reviewedBy
                    ? {
                          email: r.reviewedBy.email,
                          username: r.reviewedBy.profile?.username ?? null,
                      }
                    : null,
            })),
            total,
            page: params.page,
            pageSize: params.pageSize,
        };
    }

    async patchLawyerVerification(
        actorId: string,
        verificationId: string,
        input: { status: "APPROVED" | "REJECTED" | "REVOKED"; note?: string },
    ) {
        const prisma = getPrisma();
        const row = await prisma.lawyerVerification.findFirst({
            where: { id: verificationId, deletedAt: null },
        });
        if (!row) {
            throw new HttpError(
                HttpStatus.NOT_FOUND,
                "Verification not found",
                ErrorCode.NOT_FOUND,
            );
        }

        const now = new Date();
        if (input.status === LawyerVerificationStatus.APPROVED) {
            if (row.status !== LawyerVerificationStatus.PENDING) {
                throw new HttpError(
                    HttpStatus.BAD_REQUEST,
                    "Only PENDING verifications can be approved",
                    ErrorCode.VALIDATION_ERROR,
                );
            }
            await prisma.$transaction([
                prisma.lawyerVerification.update({
                    where: { id: verificationId },
                    data: {
                        status: LawyerVerificationStatus.APPROVED,
                        reviewedByUserId: actorId,
                        reviewedAt: now,
                        ...(input.note !== undefined ? { note: input.note } : {}),
                    },
                }),
                prisma.user.update({
                    where: { id: row.userId },
                    data: { role: UserRole.VERIFIED_LAWYER },
                }),
            ]);
        } else if (input.status === LawyerVerificationStatus.REJECTED) {
            if (row.status !== LawyerVerificationStatus.PENDING) {
                throw new HttpError(
                    HttpStatus.BAD_REQUEST,
                    "Only PENDING verifications can be rejected",
                    ErrorCode.VALIDATION_ERROR,
                );
            }
            await prisma.lawyerVerification.update({
                where: { id: verificationId },
                data: {
                    status: LawyerVerificationStatus.REJECTED,
                    reviewedByUserId: actorId,
                    reviewedAt: now,
                    ...(input.note !== undefined ? { note: input.note } : {}),
                },
            });
        } else {
            if (row.status !== LawyerVerificationStatus.APPROVED) {
                throw new HttpError(
                    HttpStatus.BAD_REQUEST,
                    "Only APPROVED verifications can be revoked",
                    ErrorCode.VALIDATION_ERROR,
                );
            }
            await prisma.$transaction([
                prisma.lawyerVerification.update({
                    where: { id: verificationId },
                    data: {
                        status: LawyerVerificationStatus.REVOKED,
                        reviewedByUserId: actorId,
                        reviewedAt: now,
                        ...(input.note !== undefined ? { note: input.note } : {}),
                    },
                }),
                prisma.user.update({
                    where: { id: row.userId },
                    data: { role: UserRole.USER },
                }),
            ]);
        }

        const updated = await prisma.lawyerVerification.findFirst({
            where: { id: verificationId },
            include: {
                user: {
                    select: {
                        id: true,
                        email: true,
                        role: true,
                        profile: { select: { username: true, displayName: true } },
                    },
                },
            },
        });
        if (!updated) {
            throw new HttpError(
                HttpStatus.NOT_FOUND,
                "Verification not found",
                ErrorCode.NOT_FOUND,
            );
        }

        return {
            verification: {
                id: updated.id,
                userId: updated.userId,
                status: updated.status,
                note: updated.note,
                reviewedAt: updated.reviewedAt?.toISOString() ?? null,
                user: {
                    id: updated.user.id,
                    email: updated.user.email,
                    role: updated.user.role,
                    username: updated.user.profile?.username ?? null,
                    displayName: updated.user.profile?.displayName ?? null,
                },
            },
        };
    }
}

export default new AdminVerificationsService();
