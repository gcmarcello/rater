import { z } from "zod";

export const signupDto = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string(),
});

export type SignupDto = z.infer<typeof signupDto>;

export const loginDto = z.object({
  email: z.string().email(),
  password: z.string(),
});

export type LoginDto = z.infer<typeof loginDto>;
