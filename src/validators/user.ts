import { z } from "zod";

export const createUserSchema = z.object({
  username: z
    .string({
      required_error: "Username is required",
    })
    .trim()
    .min(1, "Username cannot be empty"),

  email: z
    .string({
      required_error: "Email is required",
    })
    .trim()
    .email("Invalid email format")
    .toLowerCase(),

  password: z
    .string({
      required_error: "Password is required",
    })
    .min(6, "Password must be at least 6 characters long"),
});

export type registerValidationData = z.infer<typeof createUserSchema>;

export const loginUserSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
    })
    .trim()
    .email("Invalid email format")
    .toLowerCase(),

  password: z.string({
    required_error: "Password is required",
  }),
});

export type loginValidationData = z.infer<typeof loginUserSchema>;
