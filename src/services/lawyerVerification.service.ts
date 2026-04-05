import type { Prisma } from "../../generated/prisma/client.js";
import { LawyerVerificationStatus } from "../../generated/prisma/enums.js";
import { ErrorCode } from "../constants/errorCodes.js";
import { HttpStatus } from "../constants/httpStatus.js";
import { HttpError } from "../lib/httpError.js";
import { getPrisma } from "../lib/prisma.js";
import type {
    LawyerVerificationCreateInput,
    LawyerVerificationPatchInput,
} from "../validators/lawyerVerification.schema.js";

const verificationInclude = {
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

type LawyerVerificationWithRelations = Prisma.LawyerVerificationGetPayload<{
    include: typeof verificationInclude;
}>;

function toVerificationDto(row: LawyerVerificationWithRelations) {
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

class LawyerVerificationService {
    async getMyVerification(userId: string) {
        const prisma = getPrisma();
        const row = await prisma.lawyerVerification.findFirst({
            where: { userId },
            include: verificationInclude,
        });

        return row ? toVerificationDto(row) : null;
    }

    async createMyVerification(
        userId: string,
        input: LawyerVerificationCreateInput,
    ) {
        const prisma = getPrisma();
        const existing = await prisma.lawyerVerification.findFirst({
            where: { userId },
        });
        if (existing) {
            throw new HttpError(
                HttpStatus.CONFLICT,
                "You already have a lawyer verification record",
                ErrorCode.VALIDATION_ERROR,
            );
        }

        const created = await prisma.lawyerVerification.create({
            data: {
                userId,
                jurisdiction: input.jurisdiction,
                barNumber: input.barNumber,
                firmName: input.firmName ?? null,
                status: LawyerVerificationStatus.PENDING,
            },
            include: verificationInclude,
        });

        return toVerificationDto(created);
    }

    async updateMyVerification(
        userId: string,
        input: LawyerVerificationPatchInput,
    ) {
        const prisma = getPrisma();
        const current = await prisma.lawyerVerification.findFirst({
            where: { userId },
        });
        if (!current) {
            throw new HttpError(
                HttpStatus.NOT_FOUND,
                "Verification not found",
                ErrorCode.NOT_FOUND,
            );
        }

        if (
            current.status === LawyerVerificationStatus.APPROVED ||
            current.status === LawyerVerificationStatus.REVOKED
        ) {
            throw new HttpError(
                HttpStatus.BAD_REQUEST,
                "Only PENDING or REJECTED verifications can be edited",
                ErrorCode.VALIDATION_ERROR,
            );
        }

        const shouldResubmit = current.status === LawyerVerificationStatus.REJECTED;
        const updated = await prisma.lawyerVerification.update({
            where: { id: current.id },
            data: {
                ...(input.jurisdiction !== undefined
                    ? { jurisdiction: input.jurisdiction }
                    : {}),
                ...(input.barNumber !== undefined
                    ? { barNumber: input.barNumber }
                    : {}),
                ...(input.firmName !== undefined ? { firmName: input.firmName } : {}),
                ...(shouldResubmit
                    ? {
                          status: LawyerVerificationStatus.PENDING,
                          reviewedByUserId: null,
                          reviewedAt: null,
                          note: null,
                      }
                    : {}),
            },
            include: verificationInclude,
        });

        return toVerificationDto(updated);
    }
}

export default new LawyerVerificationService();
