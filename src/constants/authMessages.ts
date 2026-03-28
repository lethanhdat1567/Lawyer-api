/** User-facing copy for auth flows (non-error). */
export const AuthCopy = {
  REGISTER_CHECK_EMAIL:
    "Account created. Check your email for a verification link to activate your session.",
  FORGOT_PASSWORD_SENT:
    "If an account exists for this email, you will receive reset instructions shortly.",
  EMAIL_VERIFIED: "Email verified successfully.",
  LOGOUT: "Signed out.",
  PASSWORD_UPDATED: "Password updated. Sign in with your new password.",
} as const;
