import { z } from "zod";

export const signupSchema = z.object({
  username: z
    .string()
    .min(1, "Username is required.")
    .min(3, "Username must be at least 3 characters long.")
    .max(20, "Username must be at most 20 characters long.")
    .regex(/^[\w-]+$/, {
      message: "Username can only contain letters, numbers, and underscores.",
    }),
  email: z.string().min(1, "Email is required.").email("Invalid email format."),
  password: z
    .string()
    .min(1, "Password is required.")
    .min(8, "Password must be at least 8 characters long."),
});

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email("Please enter a valid email address."),
  password: z.string().min(1, { message: "Password is required" }).min(8, {
    message: "Password must be at least 8 characters long",
  }),
});
