import { ErrorCode } from "../constants/errorCodes.js";
import { HttpStatus } from "../constants/httpStatus.js";
import { ERROR_MESSAGES } from "../constants/messages.js";
import { HttpError } from "../lib/httpError.js";
import { getPrisma } from "../lib/prisma.js";
import type { ProfilePatchInput } from "../validators/profile.schema.js";
import authService from "./auth.service.js";
import { type PublicUser, toPublicUser } from "./user.mapper.js";

export type PublicProfileByUsername = {
    userId: string;
    username: string;
    displayName: string | null;
    avatarUrl: string | null;
    bio: string | null;
    role: string;
};

class ProfileService {
    async getPublicProfileByUsername(
        rawUsername: string,
    ): Promise<PublicProfileByUsername | null> {
        const username = rawUsername.trim();
        if (!username) return null;

        const prisma = getPrisma();
        const profile = await prisma.profile.findUnique({
            where: { username },
            include: { user: true },
        });
        if (!profile || profile.deletedAt || profile.user.deletedAt) return null;

        return {
            userId: profile.userId,
            username: profile.username,
            displayName: profile.displayName,
            avatarUrl: profile.avatarUrl,
            bio: profile.bio,
            role: profile.user.role,
        };
    }

    async getUserMe(userId: string): Promise<PublicUser | null> {
        const prisma = getPrisma();
        const user = await prisma.user.findFirst({
            where: { id: userId, deletedAt: null },
            include: { profile: true },
        });
        if (!user) return null;
        return toPublicUser(user);
    }

    async updateUserProfile(userId: string, input: ProfilePatchInput): Promise<PublicUser> {
        const prisma = getPrisma();

        let profile = await prisma.profile.findUnique({ where: { userId } });
        if (!profile) {
            const user = await prisma.user.findUnique({ where: { id: userId } });
            if (!user || user.deletedAt) {
                throw new HttpError(
                    HttpStatus.NOT_FOUND,
                    ERROR_MESSAGES[ErrorCode.NOT_FOUND],
                    ErrorCode.NOT_FOUND,
                );
            }
            profile = await prisma.profile.create({
                data: {
                    userId,
                    username: await authService.ensureUniqueUsername(
                        user.email.split("@")[0] || "user",
                    ),
                },
            });
        }

        if (input.username !== undefined) {
            const taken = await prisma.profile.findFirst({
                where: {
                    username: input.username,
                    userId: { not: userId },
                },
            });
            if (taken) {
                throw new HttpError(
                    HttpStatus.CONFLICT,
                    ERROR_MESSAGES[ErrorCode.USERNAME_TAKEN],
                    ErrorCode.USERNAME_TAKEN,
                );
            }
        }

        const data: {
            displayName?: string | null;
            bio?: string | null;
            avatarUrl?: string | null;
            contributorOptOut?: boolean;
            username?: string;
        } = {};
        if (input.displayName !== undefined) data.displayName = input.displayName;
        if (input.bio !== undefined) data.bio = input.bio;
        if (input.avatarUrl !== undefined) data.avatarUrl = input.avatarUrl;
        if (input.contributorOptOut !== undefined) data.contributorOptOut = input.contributorOptOut;
        if (input.username !== undefined) data.username = input.username;

        await prisma.profile.update({
            where: { userId },
            data,
        });

        const user = await prisma.user.findUniqueOrThrow({
            where: { id: userId },
            include: { profile: true },
        });
        return toPublicUser(user);
    }
}

export default new ProfileService();
