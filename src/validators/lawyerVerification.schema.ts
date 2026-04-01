import { z } from "zod";

const optionalTrimmedString = (max: number) =>
    z
        .union([z.string().trim().min(1).max(max), z.null()])
        .optional();

export const lawyerVerificationCreateSchema = z.object({
    jurisdiction: z.string().trim().min(1).max(200),
    barNumber: z.string().trim().min(1).max(120),
    firmName: optionalTrimmedString(200),
});

export const lawyerVerificationPatchSchema = z
    .object({
        jurisdiction: z.string().trim().min(1).max(200).optional(),
        barNumber: z.string().trim().min(1).max(120).optional(),
        firmName: optionalTrimmedString(200),
    })
    .refine(
        (value) =>
            value.jurisdiction !== undefined ||
            value.barNumber !== undefined ||
            value.firmName !== undefined,
        {
            message: "At least one field is required",
        },
    );

export type LawyerVerificationCreateInput = z.infer<
    typeof lawyerVerificationCreateSchema
>;
export type LawyerVerificationPatchInput = z.infer<
    typeof lawyerVerificationPatchSchema
>;
