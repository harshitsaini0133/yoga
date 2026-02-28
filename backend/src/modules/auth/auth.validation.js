import { z } from "zod";

const identifierSchema = z
  .string()
  .trim()
  .refine(
    (val) =>
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val) || /^[0-9]{8,15}$/.test(val),
    {
      message: "Must be a valid email or phone number",
    },
  );

export const sendOtpSchema = z
  .object({
    emailOrPhone: identifierSchema,
  })
  .strict();

export const verifyOtpSchema = z
  .object({
    emailOrPhone: identifierSchema,
    otp: z.string().regex(/^\d{6}$/, "OTP must be exactly 6 digits"),
  })
  .strict();

export const resendOtpSchema = z
  .object({
    emailOrPhone: identifierSchema,
  })
  .strict();

export const adminLoginSchema = z
  .object({
    email: z.string().email("Invalid email format"),
    password: z.string().min(6, "Password must be at least 6 characters"),
  })
  .strict();
