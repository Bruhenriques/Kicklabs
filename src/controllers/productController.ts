import { Request, Response } from "express";
import { ProductService } from "../services/productService";
import {
  createProductSchema,
  productIdSchema,
  updateProductSchema,
} from "../dtos/productDto";

export class ProductController {
  private productService = new ProductService();

  async create(req: Request, res: Response): Promise<Response> {
    const data = createProductSchema.parse(req.body);

    const product = await this.productService.create(data);

    return res.status(201).json(product);
  }

  async findAll(req: Request, res: Response): Promise<Response> {
    const products = await this.productService.findAll();

    return res.status(200).json(products);
  }

  async findById(req: Request, res: Response): Promise<Response> {
    const { id } = productIdSchema.parse(req.params);

    const product = await this.productService.findById(id);

    return res.status(200).json(product);
  }

  async update(req: Request, res: Response): Promise<Response> {
    const { id } = productIdSchema.parse(req.params);

    const data = updateProductSchema.parse(req.body);

    const product = await this.productService.update(id, data);

    return res.status(200).json(product);
  }

  async delete(req: Request, res: Response): Promise<Response> {
    const { id } = productIdSchema.parse(req.params);

    await this.productService.delete(id);

    return res.status(204).send();
  }
}