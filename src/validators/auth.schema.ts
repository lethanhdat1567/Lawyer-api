import { z } from "zod";

export const registerSchema = z.object({
  email: z.string().email().max(320),
  password: z.string().min(8).max(128),
  username: z
    .string()
    .min(3)
    .max(32)
    .regex(/^[a-zA-Z0-9_]+$/),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export const refreshSchema = z.object({
  refreshToken: z.string().min(1),
});

export const logoutSchema = z.object({
  refreshToken: z.string().min(1),
});

export const verifyEmailQuerySchema = z.object({
  token: z.string().min(1),
});

export const forgotPasswordSchema = z.object({
  email: z.string().email(),
});

export const resetPasswordSchema = z.object({
  email: z.string().email(),
  code: z.string().min(4).max(12),
  newPassword: z.string().min(8).max(128),
});

export const firebaseSignInSchema = z.object({
  idToken: z.string().min(1),
});
