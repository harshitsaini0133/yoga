import { z } from "zod";

export const updateProfileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").optional(),
  email: z.string().email("Invalid email").optional().or(z.literal("")),
  phNo: z
    .string()
    .regex(/^[0-9]{10,15}$/, "Invalid phone number")
    .optional()
    .or(z.literal("")),
  height: z.coerce.string().optional(),
  weight: z.coerce.string().optional(),
  gender: z.string().optional(),
});
