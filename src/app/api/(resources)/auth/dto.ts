import { z } from "zod";

export const signupDto = z
  .object({
    email: z.string().email({ message: "Email Inválido" }),
    password: z
      .string({ message: "Campo Obrigatório" })
      .min(6, { message: "Senha precisa ter ao menos 6 caracteres." }),
    confirmPassword: z.string(),
    name: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

export type SignupDto = z.infer<typeof signupDto>;

export const loginDto = z.object({
  email: z
    .string({ message: "Campo Obrigatório" })
    .email({ message: "Email Inválido" }),
  password: z
    .string({ message: "Campo Obrigatório" })
    .min(1, { message: "Campo Obrigatório" }),
});

export type LoginDto = z.infer<typeof loginDto>;
