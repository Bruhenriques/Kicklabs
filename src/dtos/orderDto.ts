import { z } from "zod";

export const createOrderSchema = z.object({
  userId: z
    .number()
    .int("O ID do usuário deve ser um número inteiro")
    .positive("O ID do usuário deve ser positivo"),

  items: z
    .array(
      z.object({
        productId: z
          .number()
          .int("O ID do produto deve ser um número inteiro")
          .positive("O ID do produto deve ser positivo"),

        quantity: z
          .number()
          .int("A quantidade deve ser um número inteiro")
          .positive("A quantidade deve ser maior que zero"),
      })
    )
    .min(1, "O pedido deve possuir pelo menos um produto"),
});

export type CreateOrderDTO = z.infer<typeof createOrderSchema>;

export const orderIdSchema = z.object({
  id: z.coerce.number().int().positive(),
});

export type OrderIdDTO = z.infer<typeof orderIdSchema>;