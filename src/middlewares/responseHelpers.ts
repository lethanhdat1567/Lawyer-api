import type { NextFunction, Request, Response } from "express";
import { ErrorCode } from "../constants/errorCodes.js";
import { HttpStatus } from "../constants/httpStatus.js";
import { ERROR_MESSAGES } from "../constants/messages.js";

function attach(res: Response): void {
    res.success = function success(
        data: unknown,
        statusCode: number = HttpStatus.OK,
    ): Response {
        return res.status(statusCode).json({ success: true, data }) as Response;
    };

    res.error = function error(payload: {
        code: string;
        message: string;
        statusCode?: number;
        details?: unknown;
    }): Response {
        const statusCode = payload.statusCode ?? HttpStatus.BAD_REQUEST;
        const body: {
            success: false;
            error: { code: string; message: string; details?: unknown };
        } = {
            success: false,
            error: {
                code: payload.code,
                message: payload.message,
                ...(payload.details !== undefined
                    ? { details: payload.details }
                    : {}),
            },
        };
        return res.status(statusCode).json(body) as Response;
    };

    res.unauthorization = function unauthorization(message?: string): Response {
        return res.error({
            code: ErrorCode.UNAUTHENTICATED,
            message: message ?? ERROR_MESSAGES[ErrorCode.UNAUTHENTICATED],
            statusCode: HttpStatus.UNAUTHORIZED,
        }) as Response;
    };
}

export function responseHelpers(
    _req: Request,
    res: Response,
    next: NextFunction,
): void {
    attach(res);
    next();
}
