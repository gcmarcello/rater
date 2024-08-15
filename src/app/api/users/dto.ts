import { z } from "zod";

export const updateUserDto = z.object({
  email: z.string().email(),
  name: z.string(),
  realName: z.string().optional(),
  password: z
    .string()
    .min(6, { message: "A senha deve conter ao menos 6 caracteres." })
    .optional(),
});

export type UpdateUserDto = z.infer<typeof updateUserDto>;

export const deleteUserDto = z.object({
  keepRatings: z.boolean().optional(),
});

export type DeleteUserDto = z.infer<typeof deleteUserDto>;
