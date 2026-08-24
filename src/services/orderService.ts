import { AppDataSource } from "../database/data-source";
import { Order } from "../models/Order";
import { OrderItem } from "../models/OrderItem";
import { User } from "../models/User";
import { Product } from "../models/Product";
import { CreateOrderDTO } from "../dtos/orderDto";
import { AppError } from "../errors/AppError";
import {
  calculateSubtotal,
  calculateOrderTotal,
} from "../utils/orderUtils";

export class OrderService {
  private orderRepository = AppDataSource.getRepository(Order);
  private orderItemRepository = AppDataSource.getRepository(OrderItem);
  private userRepository = AppDataSource.getRepository(User);
  private productRepository = AppDataSource.getRepository(Product);

  async create(data: CreateOrderDTO): Promise<Order> {
    const user = await this.userRepository.findOne({
      where: {
        id: data.userId,
      },
    });

    if (!user) {
      throw new AppError("Usuário não encontrado", 404);
    }

    const products = [];

    for (const item of data.items) {
      const product = await this.productRepository.findOne({
        where: {
          id: item.productId,
        },
      });

      if (!product) {
        throw new AppError(
          `Produto ${item.productId} não encontrado`,
          404
        );
      }

      if (product.stock < item.quantity) {
        throw new AppError(
          `Estoque insuficiente para o produto ${product.name}`,
          409
        );
      }

      products.push({
        item,
        product,
      });
    }

    const subtotals: number[] = [];

    for (const { item, product } of products) {
      const subtotal = calculateSubtotal(
        Number(product.price),
        item.quantity
      );

      subtotals.push(subtotal);
    }

    const total = calculateOrderTotal(subtotals);

    const order = this.orderRepository.create({
      userId: data.userId,
      total,
      status: "pending",
    });

    const savedOrder = await this.orderRepository.save(order);

    for (const { item, product } of products) {
      const subtotal = calculateSubtotal(
        Number(product.price),
        item.quantity
      );

      const orderItem = this.orderItemRepository.create({
        orderId: savedOrder.id,
        productId: product.id,
        quantity: item.quantity,
        unitPrice: Number(product.price),
        subtotal,
      });

      await this.orderItemRepository.save(orderItem);

      product.stock -= item.quantity;

      await this.productRepository.save(product);
    }

    return await this.findById(savedOrder.id);
  }

  async findAll(): Promise<Order[]> {
    return await this.orderRepository.find({
      relations: {
        user: true,
        items: {
          product: true,
        },
      },
    });
  }

  async findById(id: number): Promise<Order> {
    const order = await this.orderRepository.findOne({
      where: {
        id,
      },
      relations: {
        user: true,
        items: {
          product: true,
        },
      },
    });

    if (!order) {
      throw new AppError("Pedido não encontrado", 404);
    }

    return order;
  }

  async delete(id: number): Promise<void> {
    const order = await this.orderRepository.findOne({
      where: {
        id,
      },
      relations: {
        items: true,
      },
    });

    if (!order) {
      throw new AppError("Pedido não encontrado", 404);
    }

    for (const item of order.items) {
      const product = await this.productRepository.findOne({
        where: {
          id: item.productId,
        },
      });

      if (product) {
        product.stock += item.quantity;

        await this.productRepository.save(product);
      }
    }

    await this.orderRepository.remove(order);
  }
}