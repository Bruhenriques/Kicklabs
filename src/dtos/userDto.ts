import { z } from "zod";

export const createUserSchema = z.object({
  name: z
    .string()
    .min(2, "O nome deve possuir pelo menos 2 caracteres"),

  email: z
    .string()
    .email("E-mail inválido"),

  password: z
    .string()
    .min(6, "A senha deve possuir pelo menos 6 caracteres"),
});

export type CreateUserDTO = z.infer<typeof createUserSchema>;

export const userIdSchema = z.object({
  id: z.coerce.number().int().positive(),
});

export type UserIdDTO = z.infer<typeof userIdSchema>;

export const updateUserSchema = z.object({
  name: z
    .string()
    .min(2, "O nome deve possuir pelo menos 2 caracteres")
    .optional(),

  email: z
    .string()
    .email("E-mail inválido")
    .optional(),

  password: z
    .string()
    .min(6, "A senha deve possuir pelo menos 6 caracteres")
    .optional(),
});

export type UpdateUserDTO = z.infer<typeof updateUserSchema>;