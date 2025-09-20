import { z } from "zod";

export const createUserSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
  phone: z.string().min(10)
});

export const loginUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
});

export const verifyOtpSchema = z.object({
  email: z.string().email(),
  otp: z.string().length(6)
});
