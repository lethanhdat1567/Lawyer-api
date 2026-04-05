import type { Prisma } from "../../../generated/prisma/client.js";
import { LawyerVerificationStatus, UserRole } from "../../../generated/prisma/enums.js";
import { ErrorCode } from "../../constants/errorCodes.js";
import { HttpStatus } from "../../constants/httpStatus.js";
import { HttpError } from "../../lib/httpError.js";
import { getPrisma } from "../../lib/prisma.js";

class AdminVerificationsService {
    private readonly detailInclude = {
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
    } satisfies Prisma.LawyerVerificationInclude;

    private toVerificationRow(
        row: Prisma.LawyerVerificationGetPayload<{
            include: {
                user: {
                    select: {
                        id: true;
                        email: true;
                        role: true;
                        profile: { select: { username: true; displayName: true } };
                    };
                };
                reviewedBy: {
                    select: {
                        email: true;
                        profile: { select: { username: true } };
                    };
                };
            };
        }>,
    ) {
        return {
            id: row.id,
            userId: row.userId,
            status: row.status,
            jurisdiction: row.jurisdiction,
            barNumber: row.barNumber,
            firmName: row.firmName,
            note: row.note,
            reviewedAt: row.reviewedAt?.toISOString() ?? null,
            reviewedByUserId: row.reviewedByUserId,
            createdAt: row.createdAt.toISOString(),
            updatedAt: row.updatedAt.toISOString(),
            user: {
                id: row.user.id,
                email: row.user.email,
                role: row.user.role,
                username: row.user.profile?.username ?? null,
                displayName: row.user.profile?.displayName ?? null,
            },
            reviewedBy: row.reviewedBy
                ? {
                      email: row.reviewedBy.email,
                      username: row.reviewedBy.profile?.username ?? null,
                  }
                : null,
        };
    }

    async listLawyerVerifications(params: {
        page: number;
        pageSize: number;
        status?: LawyerVerificationStatus;
    }) {
        const prisma = getPrisma();
        const where: Prisma.LawyerVerificationWhereInput = {};
        if (params.status) where.status = params.status;

        const skip = (params.page - 1) * params.pageSize;
        const [rows, total] = await Promise.all([
            prisma.lawyerVerification.findMany({
                where,
                skip,
                take: params.pageSize,
                orderBy: { createdAt: "desc" },
                include: this.detailInclude,
            }),
            prisma.lawyerVerification.count({ where }),
        ]);

        return {
            items: rows.map((r) => this.toVerificationRow(r)),
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
            where: { id: verificationId },
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
            include: this.detailInclude,
        });
        if (!updated) {
            throw new HttpError(
                HttpStatus.NOT_FOUND,
                "Verification not found",
                ErrorCode.NOT_FOUND,
            );
        }

        return {
            verification: this.toVerificationRow(updated),
        };
    }
}

export default new AdminVerificationsService();
