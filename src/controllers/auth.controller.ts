import type { RequestHandler } from "express";
import { AuthCopy } from "../constants/authMessages.js";
import {
  forgotPassword,
  loginUser,
  logoutUser,
  refreshTokens,
  registerUser,
  resetPasswordWithCode,
  signInWithFirebase,
  verifyEmailWithToken,
} from "../services/auth.service.js";
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

export const postRegister: RequestHandler = async (req, res, next) => {
  try {
    const body = registerSchema.parse(req.body);
    const result = await registerUser(body);
    res.success(result);
  } catch (e) {
    next(e);
  }
};

export const postLogin: RequestHandler = async (req, res, next) => {
  try {
    const body = loginSchema.parse(req.body);
    const result = await loginUser(body);
    res.success(result);
  } catch (e) {
    next(e);
  }
};

export const postRefresh: RequestHandler = async (req, res, next) => {
  try {
    const body = refreshSchema.parse(req.body);
    const tokens = await refreshTokens(body.refreshToken);
    res.success(tokens);
  } catch (e) {
    next(e);
  }
};

export const postLogout: RequestHandler = async (req, res, next) => {
  try {
    const body = logoutSchema.parse(req.body);
    await logoutUser(body.refreshToken);
    res.success({ message: AuthCopy.LOGOUT });
  } catch (e) {
    next(e);
  }
};

export const getVerifyEmail: RequestHandler = async (req, res, next) => {
  try {
    const parsed = verifyEmailQuerySchema.parse(req.query);
    const result = await verifyEmailWithToken(parsed.token);
    res.success(result);
  } catch (e) {
    next(e);
  }
};

export const postForgotPassword: RequestHandler = async (req, res, next) => {
  try {
    const body = forgotPasswordSchema.parse(req.body);
    const message = await forgotPassword(body.email);
    res.success({ message });
  } catch (e) {
    next(e);
  }
};

export const postResetPassword: RequestHandler = async (req, res, next) => {
  try {
    const body = resetPasswordSchema.parse(req.body);
    await resetPasswordWithCode({
      email: body.email,
      code: body.code,
      newPassword: body.newPassword,
    });
    res.success({ message: AuthCopy.PASSWORD_UPDATED });
  } catch (e) {
    next(e);
  }
};

export const postFirebase: RequestHandler = async (req, res, next) => {
  try {
    const body = firebaseSignInSchema.parse(req.body);
    const result = await signInWithFirebase(body.idToken);
    res.success(result);
  } catch (e) {
    next(e);
  }
};
