import type { RequestHandler } from "express";
import { AuthCopy } from "../constants/authMessages.js";
import authService from "../services/auth.service.js";
import {
    firebaseSignInSchema,
    forgotPasswordSchema,
    loginSchema,
    logoutSchema,
    refreshSchema,
    registerSchema,
    resetPasswordSchema,
    verifyEmailQuerySchema,
} from "../validators/auth.schema.js";

class AuthController {
    postRegister: RequestHandler = async (req, res, next) => {
        try {
            const body = registerSchema.parse(req.body);
            const result = await authService.registerUser(body);
            res.success(result);
        } catch (e) {
            next(e);
        }
    };

    postLogin: RequestHandler = async (req, res, next) => {
        try {
            const body = loginSchema.parse(req.body);
            const result = await authService.loginUser(body);
            res.success(result);
        } catch (e) {
            next(e);
        }
    };

    postRefresh: RequestHandler = async (req, res, next) => {
        try {
            const body = refreshSchema.parse(req.body);
            const tokens = await authService.refreshTokens(body.refreshToken);
            res.success(tokens);
        } catch (e) {
            next(e);
        }
    };

    postLogout: RequestHandler = async (req, res, next) => {
        try {
            const body = logoutSchema.parse(req.body);
            await authService.logoutUser(body.refreshToken);
            res.success({ message: AuthCopy.LOGOUT });
        } catch (e) {
            next(e);
        }
    };

    getVerifyEmail: RequestHandler = async (req, res, next) => {
        try {
            const parsed = verifyEmailQuerySchema.parse(req.query);
            const result = await authService.verifyEmailWithToken(parsed.token);
            res.success(result);
        } catch (e) {
            next(e);
        }
    };

    postForgotPassword: RequestHandler = async (req, res, next) => {
        try {
            const body = forgotPasswordSchema.parse(req.body);
            const message = await authService.forgotPassword(body.email);
            res.success({ message });
        } catch (e) {
            next(e);
        }
    };

    postResetPassword: RequestHandler = async (req, res, next) => {
        try {
            const body = resetPasswordSchema.parse(req.body);
            await authService.resetPasswordWithCode({
                email: body.email,
                code: body.code,
                newPassword: body.newPassword,
            });
            res.success({ message: AuthCopy.PASSWORD_UPDATED });
        } catch (e) {
            next(e);
        }
    };

    postFirebase: RequestHandler = async (req, res, next) => {
        try {
            const body = firebaseSignInSchema.parse(req.body);
            const result = await authService.signInWithFirebase(body.idToken);
            res.success(result);
        } catch (e) {
            next(e);
        }
    };
}

export default new AuthController();
