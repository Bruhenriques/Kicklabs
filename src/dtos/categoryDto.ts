import { z } from "zod";

export const createCategorySchema = z.object({
  name: z
    .string()
    .min(2, "O nome da categoria deve possuir pelo menos 2 caracteres"),
});

export type CreateCategoryDTO = z.infer<typeof createCategorySchema>;

export const categoryIdSchema = z.object({
  id: z.coerce.number().int().positive(),
});

export type CategoryIdDTO = z.infer<typeof categoryIdSchema>;

export const updateCategorySchema = z.object({
  name: z
    .string()
    .min(2, "O nome da categoria deve possuir pelo menos 2 caracteres"),
});

export type UpdateCategoryDTO = z.infer<typeof updateCategorySchema>;