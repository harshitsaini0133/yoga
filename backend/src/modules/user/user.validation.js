import { z } from "zod";

export const updateProfileSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters").optional(),
    email: z.email("Invalid email").optional(),
    phNo: z
      .string()
      .regex(/^[0-9]{10,15}$/, "Invalid phone number")
      .optional(),
    height: z.string().optional(),
    weight: z.string().optional(),
    gender: z.string().optional(),
  })
  .strict();
