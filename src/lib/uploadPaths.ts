import fs from "fs";
import path from "path";

export function getUploadStorePath(): string {
  const fromEnv = process.env.UPLOAD_DIR?.trim();
  if (fromEnv) {
    return path.resolve(fromEnv);
  }
  return path.join(process.cwd(), "uploads", "store");
}

export function ensureUploadDir(): void {
  fs.mkdirSync(getUploadStorePath(), { recursive: true });
}
