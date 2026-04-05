import jwt, { type JwtPayload } from "jsonwebtoken";
import { ErrorCode } from "../constants/errorCodes.js";
import { HttpStatus } from "../constants/httpStatus.js";
import { ERROR_MESSAGES } from "../constants/messages.js";
import { HttpError } from "../lib/httpError.js";
import { hashToken, randomUrlToken } from "../lib/cryptoToken.js";
import { getPrisma } from "../lib/prisma.js";
import type { User } from "../../generated/prisma/client.js";
import { UserRole } from "../../generated/prisma/enums.js";

const ACCESS_TYP = "access";
const REFRESH_TYP = "refresh";

const ROLE_SET = new Set<string>(Object.values(UserRole));

export function verifyAccessTokenForRequest(token: string): {
    id: string;
    role: UserRole;
} {
    const secret = getAccessSecret();
    const decoded = jwt.verify(token, secret) as JwtPayload & {
        typ?: string;
        sub?: string;
        role?: string;
    };
    if (decoded.typ !== ACCESS_TYP) {
        throw new Error("Invalid access token");
    }
    if (typeof decoded.sub !== "string" || !decoded.sub) {
        throw new Error("Invalid token subject");
    }
    if (typeof decoded.role !== "string" || !ROLE_SET.has(decoded.role)) {
        throw new Error("Invalid token role");
    }
    return { id: decoded.sub, role: decoded.role as UserRole };
}

function getAccessSecret(): string {
    const secret = process.env.JWT_ACCESS_SECRET ?? process.env.JWT_SECRET;
    if (!secret) {
        throw new HttpError(
            HttpStatus.INTERNAL_SERVER_ERROR,
            ERROR_MESSAGES[ErrorCode.INTERNAL_ERROR],
            ErrorCode.INTERNAL_ERROR,
        );
    }
    return secret;
}

function getRefreshSecret(): string {
    const secret = process.env.JWT_REFRESH_SECRET ?? process.env.JWT_SECRET;
    if (!secret) {
        throw new HttpError(
            HttpStatus.INTERNAL_SERVER_ERROR,
            ERROR_MESSAGES[ErrorCode.INTERNAL_ERROR],
            ErrorCode.INTERNAL_ERROR,
        );
    }
    return secret;
}

export interface TokenPair {
    accessToken: string;
    refreshToken: string;
    accessTokenExpiresAt: string;
}

export function signAccessToken(user: { id: string; role: UserRole }): {
    accessToken: string;
    accessTokenExpiresAt: string;
} {
    const secret = getAccessSecret();
    const expiresIn = (process.env.JWT_ACCESS_EXPIRES_IN ??
        "15m") as jwt.SignOptions["expiresIn"];
    const signOptions: jwt.SignOptions = { expiresIn };
    const accessToken = jwt.sign(
        { typ: ACCESS_TYP, sub: user.id, role: user.role },
        secret,
        signOptions,
    );
    const decoded = jwt.decode(accessToken) as JwtPayload;
    const exp = decoded.exp;
    if (typeof exp !== "number") {
        throw new HttpError(
            HttpStatus.INTERNAL_SERVER_ERROR,
            ERROR_MESSAGES[ErrorCode.INTERNAL_ERROR],
            ErrorCode.INTERNAL_ERROR,
        );
    }
    return {
        accessToken,
        accessTokenExpiresAt: new Date(exp * 1000).toISOString(),
    };
}

export async function issueTokenPair(user: User): Promise<TokenPair> {
    const { accessToken, accessTokenExpiresAt } = signAccessToken({
        id: user.id,
        role: user.role,
    });
    const refreshToken = await createRefreshTokenJti(user.id);
    return { accessToken, refreshToken, accessTokenExpiresAt };
}

async function createRefreshTokenJti(userId: string): Promise<string> {
    const prisma = getPrisma();
    const refreshSecret = getRefreshSecret();
    const expiresIn = (process.env.JWT_REFRESH_EXPIRES_IN ??
        "7d") as jwt.SignOptions["expiresIn"];

    const pendingHash = hashToken(randomUrlToken(16));
    const session = await prisma.refreshSession.create({
        data: {
            userId,
            tokenHash: pendingHash,
            expiresAt: new Date(Date.now() + 8 * 24 * 60 * 60 * 1000),
        },
    });

    const signOptions: jwt.SignOptions = { expiresIn };
    const refreshToken = jwt.sign(
        { typ: REFRESH_TYP, sub: userId, sid: session.id },
        refreshSecret,
        signOptions,
    );
    const decoded = jwt.decode(refreshToken) as JwtPayload;
    const exp = decoded.exp;
    if (typeof exp !== "number") {
        await prisma.refreshSession.delete({ where: { id: session.id } });
        throw new HttpError(
            HttpStatus.INTERNAL_SERVER_ERROR,
            ERROR_MESSAGES[ErrorCode.INTERNAL_ERROR],
            ErrorCode.INTERNAL_ERROR,
        );
    }
    const expiresAt = new Date(exp * 1000);
    await prisma.refreshSession.update({
        where: { id: session.id },
        data: {
            tokenHash: hashToken(refreshToken),
            expiresAt,
        },
    });
    return refreshToken;
}

export async function rotateRefreshToken(
    refreshToken: string,
): Promise<TokenPair> {
    const prisma = getPrisma();
    let payload: JwtPayload;
    try {
        payload = jwt.verify(refreshToken, getRefreshSecret()) as JwtPayload;
    } catch {
        throw new HttpError(
            HttpStatus.UNAUTHORIZED,
            ERROR_MESSAGES[ErrorCode.INVALID_OR_EXPIRED_TOKEN],
            ErrorCode.INVALID_OR_EXPIRED_TOKEN,
        );
    }
    if (payload.typ !== REFRESH_TYP || typeof payload.sub !== "string") {
        throw new HttpError(
            HttpStatus.UNAUTHORIZED,
            ERROR_MESSAGES[ErrorCode.INVALID_OR_EXPIRED_TOKEN],
            ErrorCode.INVALID_OR_EXPIRED_TOKEN,
        );
    }
    const sid = payload.sid;
    if (typeof sid !== "string") {
        throw new HttpError(
            HttpStatus.UNAUTHORIZED,
            ERROR_MESSAGES[ErrorCode.INVALID_OR_EXPIRED_TOKEN],
            ErrorCode.INVALID_OR_EXPIRED_TOKEN,
        );
    }
    const session = await prisma.refreshSession.findFirst({
        where: {
            id: sid,
            userId: payload.sub,
            revokedAt: null,
        },
    });
    if (!session || session.expiresAt < new Date()) {
        throw new HttpError(
            HttpStatus.UNAUTHORIZED,
            ERROR_MESSAGES[ErrorCode.INVALID_OR_EXPIRED_TOKEN],
            ErrorCode.INVALID_OR_EXPIRED_TOKEN,
        );
    }
    if (session.tokenHash !== hashToken(refreshToken)) {
        throw new HttpError(
            HttpStatus.UNAUTHORIZED,
            ERROR_MESSAGES[ErrorCode.INVALID_OR_EXPIRED_TOKEN],
            ErrorCode.INVALID_OR_EXPIRED_TOKEN,
        );
    }
    const user = await prisma.user.findFirst({
        where: { id: payload.sub },
    });
    if (!user) {
        throw new HttpError(
            HttpStatus.UNAUTHORIZED,
            ERROR_MESSAGES[ErrorCode.INVALID_OR_EXPIRED_TOKEN],
            ErrorCode.INVALID_OR_EXPIRED_TOKEN,
        );
    }
    await prisma.refreshSession.update({
        where: { id: session.id },
        data: { revokedAt: new Date() },
    });
    return issueTokenPair(user);
}

export async function revokeRefreshSession(
    refreshToken: string,
): Promise<void> {
    const prisma = getPrisma();
    let payload: JwtPayload;
    try {
        payload = jwt.verify(refreshToken, getRefreshSecret()) as JwtPayload;
    } catch {
        return;
    }
    if (payload.typ !== REFRESH_TYP || typeof payload.sub !== "string") {
        return;
    }
    const sid = payload.sid;
    if (typeof sid !== "string") {
        return;
    }
    const session = await prisma.refreshSession.findFirst({
        where: { id: sid, userId: payload.sub, revokedAt: null },
    });
    if (!session || session.tokenHash !== hashToken(refreshToken)) {
        return;
    }
    await prisma.refreshSession.update({
        where: { id: session.id },
        data: { revokedAt: new Date() },
    });
}

export async function revokeAllRefreshSessionsForUser(
    userId: string,
): Promise<void> {
    const prisma = getPrisma();
    await prisma.refreshSession.updateMany({
        where: { userId, revokedAt: null },
        data: { revokedAt: new Date() },
    });
}
