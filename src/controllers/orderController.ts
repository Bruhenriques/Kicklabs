import { Request, Response } from "express";
import { OrderService } from "../services/orderService";
import {
  createOrderSchema,
  orderIdSchema,
} from "../dtos/orderDto";

export class OrderController {
  private orderService = new OrderService();

  async create(req: Request, res: Response): Promise<Response> {
    const data = createOrderSchema.parse(req.body);

    const order = await this.orderService.create(data);

    return res.status(201).json(order);
  }

  async findAll(req: Request, res: Response): Promise<Response> {
    const orders = await this.orderService.findAll();

    return res.status(200).json(orders);
  }

  async findById(req: Request, res: Response): Promise<Response> {
    const { id } = orderIdSchema.parse(req.params);

    const order = await this.orderService.findById(id);

    return res.status(200).json(order);
  }

  async delete(req: Request, res: Response): Promise<Response> {
    const { id } = orderIdSchema.parse(req.params);

    await this.orderService.delete(id);

    return res.status(204).send();
  }
}