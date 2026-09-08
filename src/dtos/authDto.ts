import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("E-mail inválido"),
  password: z.string().min(6, "A senha deve possuir pelo menos 6 caracteres"),
});

export type LoginDTO = z.infer<typeof loginSchema>;