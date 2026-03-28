import { createHash, randomBytes } from "node:crypto";

export function hashToken(raw: string): string {
  return createHash("sha256").update(raw).digest("hex");
}

export function randomUrlToken(bytes = 32): string {
  return randomBytes(bytes).toString("base64url");
}

export function randomNumericCode(digits = 6): string {
  const n = 10 ** digits;
  const v = Math.floor(Math.random() * n);
  return String(v).padStart(digits, "0");
}
