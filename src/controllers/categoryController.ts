import { Request, Response } from "express";
import { CategoryService } from "../services/categoryService";
import {
  createCategorySchema,
  categoryIdSchema,
  updateCategorySchema,
} from "../dtos/categoryDto";

export class CategoryController {
  private categoryService = new CategoryService();

  async create(req: Request, res: Response): Promise<Response> {
    const data = createCategorySchema.parse(req.body);

    const category = await this.categoryService.create(data);

    return res.status(201).json(category);
  }

  async findAll(req: Request, res: Response): Promise<Response> {
    const categories = await this.categoryService.findAll();

    return res.status(200).json(categories);
  }

  async findById(req: Request, res: Response): Promise<Response> {
    const { id } = categoryIdSchema.parse(req.params);

    const category = await this.categoryService.findById(id);

    return res.status(200).json(category);
  }

  async update(req: Request, res: Response): Promise<Response> {
    const { id } = categoryIdSchema.parse(req.params);

    const data = updateCategorySchema.parse(req.body);

    const category = await this.categoryService.update(id, data);

    return res.status(200).json(category);
  }

  async delete(req: Request, res: Response): Promise<Response> {
    const { id } = categoryIdSchema.parse(req.params);

    await this.categoryService.delete(id);

    return res.status(204).send();
  }
}