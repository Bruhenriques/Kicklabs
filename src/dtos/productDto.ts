import { z } from "zod";

export const createProductSchema = z.object({
  name: z
    .string()
    .min(2, "O nome do produto deve possuir pelo menos 2 caracteres"),

  description: z
    .string()
    .min(5, "A descrição deve possuir pelo menos 5 caracteres"),

  price: z
    .number()
    .positive("O preço deve ser maior que zero"),

  stock: z
    .number()
    .int("O estoque deve ser um número inteiro")
    .nonnegative("O estoque não pode ser negativo"),

  image: z
    .string()
    .min(1, "A imagem é obrigatória"),

  categoryId: z
    .number()
    .int("O ID da categoria deve ser um número inteiro")
    .positive("O ID da categoria deve ser positivo"),
});

export type CreateProductDTO = z.infer<typeof createProductSchema>;

export const productIdSchema = z.object({
  id: z.coerce.number().int().positive(),
});

export type ProductIdDTO = z.infer<typeof productIdSchema>;

export const updateProductSchema = z.object({
  name: z
    .string()
    .min(2, "O nome do produto deve possuir pelo menos 2 caracteres")
    .optional(),

  description: z
    .string()
    .min(5, "A descrição deve possuir pelo menos 5 caracteres")
    .optional(),

  price: z
    .number()
    .positive("O preço deve ser maior que zero")
    .optional(),

  stock: z
    .number()
    .int("O estoque deve ser um número inteiro")
    .nonnegative("O estoque não pode ser negativo")
    .optional(),

  image: z
    .string()
    .min(1, "A imagem é obrigatória")
    .optional(),

  categoryId: z
    .number()
    .int("O ID da categoria deve ser um número inteiro")
    .positive("O ID da categoria deve ser positivo")
    .optional(),
});

export type UpdateProductDTO = z.infer<typeof updateProductSchema>;