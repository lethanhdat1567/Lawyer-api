import { ErrorCode, type ErrorCode as ErrorCodeType } from "./errorCodes.js";

export const ERROR_MESSAGES: Record<ErrorCodeType, string> = {
    [ErrorCode.UNAUTHENTICATED]: "Authentication required",
    [ErrorCode.FORBIDDEN]: "You do not have permission to access this resource",
    [ErrorCode.NOT_FOUND]: "Route not found",
    [ErrorCode.VALIDATION_ERROR]: "Validation failed",
    [ErrorCode.RATE_LIMITED]: "Too many requests, please try again later",
    [ErrorCode.INTERNAL_ERROR]: "Internal server error",
    [ErrorCode.HTTP_ERROR]: "Request could not be completed",
    [ErrorCode.EMAIL_TAKEN]: "This email is already registered",
    [ErrorCode.USERNAME_TAKEN]: "This username is already taken",
    [ErrorCode.INVALID_CREDENTIALS]: "Invalid email or password",
    [ErrorCode.ACCOUNT_EXISTS_PASSWORD]:
        "An account with this email already uses password sign-in. Log in with email and password.",
    [ErrorCode.AUTH_IDENTITY_CONFLICT]:
        "This sign-in identity conflicts with an existing account. Contact support.",
    [ErrorCode.INVALID_OR_EXPIRED_TOKEN]: "Invalid or expired token",
    [ErrorCode.OAUTH_ACCOUNT_HINT]:
        "This account uses Google sign-in. Use Sign in with Google.",
    [ErrorCode.HUB_SLUG_TAKEN]: "A Hub post with this slug already exists",
};
