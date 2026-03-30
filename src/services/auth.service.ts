import bcrypt from "bcrypt";
import { AuthProvider, UserRole } from "../../generated/prisma/enums.js";
import { ErrorCode } from "../constants/errorCodes.js";
import { HttpStatus } from "../constants/httpStatus.js";
import { ERROR_MESSAGES } from "../constants/messages.js";
import { AuthCopy } from "../constants/authMessages.js";
import { hashToken, randomNumericCode, randomUrlToken } from "../lib/cryptoToken.js";
import { verifyFirebaseIdToken } from "../lib/firebaseAdmin.js";
import { HttpError } from "../lib/httpError.js";
import { getPrisma } from "../lib/prisma.js";
import {
    issueTokenPair,
    revokeAllRefreshSessionsForUser,
    revokeRefreshSession,
    rotateRefreshToken,
    type TokenPair,
} from "./token.service.js";
import { sendEmailVerification, sendPasswordResetCode } from "./email.service.js";
import { type PublicUser, toPublicUser } from "./user.mapper.js";

export type { PublicUser } from "./user.mapper.js";

const BCRYPT_ROUNDS = 12;
const EMAIL_VERIFY_HOURS = Number(process.env.EMAIL_VERIFICATION_TTL_HOURS) || 48;
const RESET_MINUTES = Number(process.env.PASSWORD_RESET_TTL_MINUTES) || 30;
const MAX_RESET_ATTEMPTS = 5;

export type AuthTokensResponse = TokenPair & { user: PublicUser };
export type RegisterResponse = { user: PublicUser; message: string };
export type VerifyEmailResult =
    | (AuthTokensResponse & { verified: true; message: string })
    | { verified: true; message: string };

class AuthService {
    async ensureUniqueUsername(baseRaw: string): Promise<string> {
        const prisma = getPrisma();
        const sanitized = baseRaw.slice(0, 24).replace(/[^a-zA-Z0-9_]/g, "_") || "user";
        let candidate = sanitized;
        let n = 0;
        while (await prisma.profile.findUnique({ where: { username: candidate } })) {
            n += 1;
            candidate = `${sanitized.slice(0, 16)}_${n}_${randomUrlToken(3)}`;
        }
        return candidate;
    }

    async registerUser(input: {
        email: string;
        password: string;
        username: string;
    }): Promise<RegisterResponse> {
        const prisma = getPrisma();
        const email = input.email.trim().toLowerCase();
        const username = input.username.trim();

        if (await prisma.user.findUnique({ where: { email } })) {
            throw new HttpError(
                HttpStatus.CONFLICT,
                ERROR_MESSAGES[ErrorCode.EMAIL_TAKEN],
                ErrorCode.EMAIL_TAKEN,
            );
        }
        if (await prisma.profile.findUnique({ where: { username } })) {
            throw new HttpError(
                HttpStatus.CONFLICT,
                ERROR_MESSAGES[ErrorCode.USERNAME_TAKEN],
                ErrorCode.USERNAME_TAKEN,
            );
        }

        const passwordHash = await bcrypt.hash(input.password, BCRYPT_ROUNDS);
        let rawVerifyToken = "";
        const created = await prisma.$transaction(async (tx) => {
            const u = await tx.user.create({
                data: { email, passwordHash, role: UserRole.USER },
            });
            await tx.profile.create({ data: { userId: u.id, username } });
            await tx.emailVerificationToken.deleteMany({ where: { userId: u.id } });
            rawVerifyToken = randomUrlToken(32);
            await tx.emailVerificationToken.create({
                data: {
                    userId: u.id,
                    tokenHash: hashToken(rawVerifyToken),
                    expiresAt: new Date(Date.now() + EMAIL_VERIFY_HOURS * 3600 * 1000),
                },
            });
            return tx.user.findUniqueOrThrow({
                where: { id: u.id },
                include: { profile: true },
            });
        });

        await sendEmailVerification(email, rawVerifyToken);
        return { user: toPublicUser(created), message: AuthCopy.REGISTER_CHECK_EMAIL };
    }

    async loginUser(input: { email: string; password: string }): Promise<AuthTokensResponse> {
        const prisma = getPrisma();
        const email = input.email.trim().toLowerCase();
        const user = await prisma.user.findUnique({
            where: { email },
            include: { profile: true },
        });
        if (!user?.passwordHash || user.deletedAt) {
            throw new HttpError(
                HttpStatus.UNAUTHORIZED,
                ERROR_MESSAGES[ErrorCode.INVALID_CREDENTIALS],
                ErrorCode.INVALID_CREDENTIALS,
            );
        }
        const ok = await bcrypt.compare(input.password, user.passwordHash);
        if (!ok) {
            throw new HttpError(
                HttpStatus.UNAUTHORIZED,
                ERROR_MESSAGES[ErrorCode.INVALID_CREDENTIALS],
                ErrorCode.INVALID_CREDENTIALS,
            );
        }
        const tokens = await issueTokenPair(user);
        return { user: toPublicUser(user), ...tokens };
    }

    async refreshTokens(refreshToken: string): Promise<TokenPair> {
        return rotateRefreshToken(refreshToken);
    }

    async logoutUser(refreshToken: string): Promise<void> {
        await revokeRefreshSession(refreshToken);
    }

    async verifyEmailWithToken(rawToken: string): Promise<VerifyEmailResult> {
        const prisma = getPrisma();
        const tokenHash = hashToken(rawToken);
        const row = await prisma.emailVerificationToken.findFirst({
            where: { tokenHash, consumedAt: null, expiresAt: { gt: new Date() } },
            include: { user: { include: { profile: true } } },
        });
        if (!row) {
            throw new HttpError(
                HttpStatus.BAD_REQUEST,
                ERROR_MESSAGES[ErrorCode.INVALID_OR_EXPIRED_TOKEN],
                ErrorCode.INVALID_OR_EXPIRED_TOKEN,
            );
        }
        if (row.user.emailVerifiedAt) return { verified: true, message: AuthCopy.EMAIL_VERIFIED };

        const userWithProfile = await prisma.$transaction(async (tx) => {
            await tx.user.update({
                where: { id: row.userId },
                data: { emailVerifiedAt: new Date() },
            });
            await tx.emailVerificationToken.update({
                where: { id: row.id },
                data: { consumedAt: new Date() },
            });
            return tx.user.findUniqueOrThrow({
                where: { id: row.userId },
                include: { profile: true },
            });
        });

        const tokens = await issueTokenPair(userWithProfile);
        return {
            verified: true,
            message: AuthCopy.EMAIL_VERIFIED,
            user: toPublicUser(userWithProfile),
            ...tokens,
        };
    }

    async forgotPassword(emailRaw: string): Promise<string> {
        const prisma = getPrisma();
        const email = emailRaw.trim().toLowerCase();
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user?.passwordHash || user.deletedAt) return AuthCopy.FORGOT_PASSWORD_SENT;

        await prisma.passwordResetToken.updateMany({
            where: { userId: user.id, consumedAt: null },
            data: { consumedAt: new Date() },
        });
        const code = randomNumericCode(6);
        await prisma.passwordResetToken.create({
            data: {
                userId: user.id,
                codeHash: hashToken(code),
                expiresAt: new Date(Date.now() + RESET_MINUTES * 60 * 1000),
            },
        });
        await sendPasswordResetCode(email, code);
        return AuthCopy.FORGOT_PASSWORD_SENT;
    }

    async resetPasswordWithCode(input: {
        email: string;
        code: string;
        newPassword: string;
    }): Promise<void> {
        const prisma = getPrisma();
        const email = input.email.trim().toLowerCase();
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user?.passwordHash || user.deletedAt) {
            throw new HttpError(
                HttpStatus.BAD_REQUEST,
                ERROR_MESSAGES[ErrorCode.INVALID_OR_EXPIRED_TOKEN],
                ErrorCode.INVALID_OR_EXPIRED_TOKEN,
            );
        }
        const active = await prisma.passwordResetToken.findFirst({
            where: { userId: user.id, consumedAt: null, expiresAt: { gt: new Date() } },
            orderBy: { createdAt: "desc" },
        });
        if (!active || active.attempts >= MAX_RESET_ATTEMPTS) {
            throw new HttpError(
                HttpStatus.BAD_REQUEST,
                ERROR_MESSAGES[ErrorCode.INVALID_OR_EXPIRED_TOKEN],
                ErrorCode.INVALID_OR_EXPIRED_TOKEN,
            );
        }
        if (active.codeHash !== hashToken(input.code.trim())) {
            await prisma.passwordResetToken.update({
                where: { id: active.id },
                data: { attempts: { increment: 1 } },
            });
            throw new HttpError(
                HttpStatus.BAD_REQUEST,
                ERROR_MESSAGES[ErrorCode.INVALID_OR_EXPIRED_TOKEN],
                ErrorCode.INVALID_OR_EXPIRED_TOKEN,
            );
        }
        const passwordHash = await bcrypt.hash(input.newPassword, BCRYPT_ROUNDS);
        await prisma.$transaction([
            prisma.user.update({ where: { id: user.id }, data: { passwordHash } }),
            prisma.passwordResetToken.update({
                where: { id: active.id },
                data: { consumedAt: new Date() },
            }),
        ]);
        await revokeAllRefreshSessionsForUser(user.id);
    }

    async signInWithFirebase(idToken: string): Promise<AuthTokensResponse> {
        const prisma = getPrisma();
        let decoded: Awaited<ReturnType<typeof verifyFirebaseIdToken>>;
        try {
            decoded = await verifyFirebaseIdToken(idToken);
        } catch {
            throw new HttpError(
                HttpStatus.UNAUTHORIZED,
                ERROR_MESSAGES[ErrorCode.INVALID_OR_EXPIRED_TOKEN],
                ErrorCode.INVALID_OR_EXPIRED_TOKEN,
            );
        }
        const email = decoded.email?.trim().toLowerCase();
        const uid = decoded.uid;
        const emailVerified = decoded.email_verified === true;
        if (!email) {
            throw new HttpError(
                HttpStatus.BAD_REQUEST,
                ERROR_MESSAGES[ErrorCode.VALIDATION_ERROR],
                ErrorCode.VALIDATION_ERROR,
            );
        }

        const existingIdentity = await prisma.userAuthIdentity.findFirst({
            where: { provider: AuthProvider.FIREBASE, providerUserId: uid },
            include: { user: { include: { profile: true } } },
        });
        if (existingIdentity) {
            const u = existingIdentity.user;
            if (u.deletedAt) {
                throw new HttpError(
                    HttpStatus.UNAUTHORIZED,
                    ERROR_MESSAGES[ErrorCode.UNAUTHENTICATED],
                    ErrorCode.UNAUTHENTICATED,
                );
            }
            if (emailVerified && !u.emailVerifiedAt) {
                await prisma.user.update({
                    where: { id: u.id },
                    data: { emailVerifiedAt: new Date() },
                });
            }
            const fresh = await prisma.user.findUniqueOrThrow({
                where: { id: u.id },
                include: { profile: true },
            });
            const tokens = await issueTokenPair(fresh);
            return { user: toPublicUser(fresh), ...tokens };
        }

        const userByEmail = await prisma.user.findUnique({
            where: { email },
            include: { authIdentities: true, profile: true },
        });

        if (userByEmail?.passwordHash) {
            if (!emailVerified) {
                throw new HttpError(
                    HttpStatus.BAD_REQUEST,
                    ERROR_MESSAGES[ErrorCode.VALIDATION_ERROR],
                    ErrorCode.VALIDATION_ERROR,
                );
            }
            throw new HttpError(
                HttpStatus.CONFLICT,
                ERROR_MESSAGES[ErrorCode.ACCOUNT_EXISTS_PASSWORD],
                ErrorCode.ACCOUNT_EXISTS_PASSWORD,
            );
        }

        if (userByEmail) {
            const conflicting = userByEmail.authIdentities.some(
                (i) => i.provider === AuthProvider.FIREBASE && i.providerUserId !== uid,
            );
            if (conflicting) {
                console.error("[auth] Firebase identity conflict", { email, uid });
                throw new HttpError(
                    HttpStatus.CONFLICT,
                    ERROR_MESSAGES[ErrorCode.AUTH_IDENTITY_CONFLICT],
                    ErrorCode.AUTH_IDENTITY_CONFLICT,
                );
            }
            await prisma.userAuthIdentity.create({
                data: {
                    userId: userByEmail.id,
                    provider: AuthProvider.FIREBASE,
                    providerUserId: uid,
                    emailAtLink: email,
                },
            });
            if (emailVerified && !userByEmail.emailVerifiedAt) {
                await prisma.user.update({
                    where: { id: userByEmail.id },
                    data: { emailVerifiedAt: new Date() },
                });
            }
            const full = await prisma.user.findUniqueOrThrow({
                where: { id: userByEmail.id },
                include: { profile: true },
            });
            const tokens = await issueTokenPair(full);
            return { user: toPublicUser(full), ...tokens };
        }

        const username = await this.ensureUniqueUsername(email.split("@")[0] || "user");
        const newUser = await prisma.$transaction(async (tx) => {
            const u = await tx.user.create({
                data: {
                    email,
                    passwordHash: null,
                    emailVerifiedAt: emailVerified ? new Date() : null,
                },
            });
            await tx.profile.create({ data: { userId: u.id, username } });
            await tx.userAuthIdentity.create({
                data: {
                    userId: u.id,
                    provider: AuthProvider.FIREBASE,
                    providerUserId: uid,
                    emailAtLink: email,
                },
            });
            return tx.user.findUniqueOrThrow({
                where: { id: u.id },
                include: { profile: true },
            });
        });
        const tokens = await issueTokenPair(newUser);
        return { user: toPublicUser(newUser), ...tokens };
    }
}

export default new AuthService();
