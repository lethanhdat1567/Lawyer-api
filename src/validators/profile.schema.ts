import { z } from "zod";

function avatarOk(v: string): boolean {
  if (v.length === 0) return false;
  return v.startsWith("/upload/") || /^https?:\/\//i.test(v);
}

export const profilePatchSchema = z
  .object({
    displayName: z.union([z.string().max(120), z.null()]).optional(),
    bio: z.union([z.string().max(2000), z.null()]).optional(),
    avatarUrl: z
      .union([z.string().max(2048), z.null()])
      .optional()
      .superRefine((val, ctx) => {
        if (typeof val === "string" && !avatarOk(val)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message:
              "avatarUrl must be /upload/... or http(s) URL",
          });
        }
      }),
    contributorOptOut: z.boolean().optional(),
    username: z
      .string()
      .min(3)
      .max(32)
      .regex(/^[a-zA-Z0-9_]+$/)
      .optional(),
  })
  .refine((o) => Object.values(o).some((v) => v !== undefined), {
    message: "At least one field is required",
  });

export type ProfilePatchInput = z.infer<typeof profilePatchSchema>;
