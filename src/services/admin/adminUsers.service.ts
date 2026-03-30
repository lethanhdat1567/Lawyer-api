import type { Prisma } from "../../../generated/prisma/client.js";
import { UserRole } from "../../../generated/prisma/enums.js";
import { ErrorCode } from "../../constants/errorCodes.js";
import { HttpStatus } from "../../constants/httpStatus.js";
import { HttpError } from "../../lib/httpError.js";
import { getPrisma } from "../../lib/prisma.js";

class AdminUsersService {
    async listUsers(params: { page: number; pageSize: number; q?: string; role?: UserRole }) {
        const prisma = getPrisma();
        const where: Prisma.UserWhereInput = { deletedAt: null };
        if (params.role) where.role = params.role;
        if (params.q?.trim()) {
            const q = params.q.trim();
            where.OR = [
                { email: { contains: q } },
                { profile: { is: { username: { contains: q }, deletedAt: null } } },
                { profile: { is: { displayName: { contains: q }, deletedAt: null } } },
            ];
        }

        const skip = (params.page - 1) * params.pageSize;
        const [rows, total] = await Promise.all([
            prisma.user.findMany({
                where,
                skip,
                take: params.pageSize,
                orderBy: { createdAt: "desc" },
                select: {
                    id: true,
                    email: true,
                    role: true,
                    createdAt: true,
                    emailVerifiedAt: true,
                    profile: { select: { username: true, displayName: true } },
                },
            }),
            prisma.user.count({ where }),
        ]);

        return {
            items: rows.map((u) => ({
                id: u.id,
                email: u.email,
                role: u.role,
                createdAt: u.createdAt.toISOString(),
                emailVerifiedAt: u.emailVerifiedAt?.toISOString() ?? null,
                username: u.profile?.username ?? null,
                displayName: u.profile?.displayName ?? null,
            })),
            total,
            page: params.page,
            pageSize: params.pageSize,
        };
    }

    async patchUserRole(actorId: string, targetUserId: string, newRole: UserRole) {
        const prisma = getPrisma();
        const target = await prisma.user.findFirst({
            where: { id: targetUserId, deletedAt: null },
            select: { id: true, role: true },
        });
        if (!target) {
            throw new HttpError(HttpStatus.NOT_FOUND, "User not found", ErrorCode.NOT_FOUND);
        }

        if (target.role === UserRole.ADMIN && newRole !== UserRole.ADMIN) {
            if (actorId === targetUserId) {
                throw new HttpError(
                    HttpStatus.FORBIDDEN,
                    "Cannot demote yourself",
                    ErrorCode.FORBIDDEN,
                );
            }
            const adminCount = await prisma.user.count({
                where: { role: UserRole.ADMIN, deletedAt: null },
            });
            if (adminCount <= 1) {
                throw new HttpError(
                    HttpStatus.FORBIDDEN,
                    "Cannot remove last admin",
                    ErrorCode.FORBIDDEN,
                );
            }
        }

        const updated = await prisma.user.update({
            where: { id: targetUserId },
            data: { role: newRole },
            select: {
                id: true,
                email: true,
                role: true,
                createdAt: true,
                emailVerifiedAt: true,
                profile: { select: { username: true, displayName: true } },
            },
        });

        return {
            user: {
                id: updated.id,
                email: updated.email,
                role: updated.role,
                createdAt: updated.createdAt.toISOString(),
                emailVerifiedAt: updated.emailVerifiedAt?.toISOString() ?? null,
                username: updated.profile?.username ?? null,
                displayName: updated.profile?.displayName ?? null,
            },
        };
    }
}

export default new AdminUsersService();
