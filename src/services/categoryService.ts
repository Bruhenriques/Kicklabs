import { AppDataSource } from "../database/data-source";
import { Category } from "../models/Category";
import {
  CreateCategoryDTO,
  UpdateCategoryDTO,
} from "../dtos/categoryDto";
import { AppError } from "../errors/AppError";

export class CategoryService {
  private categoryRepository = AppDataSource.getRepository(Category);

  async create(data: CreateCategoryDTO): Promise<Category> {
    const existingCategory = await this.categoryRepository.findOne({
      where: {
        name: data.name,
      },
    });

    if (existingCategory) {
      throw new AppError("Categoria já cadastrada", 409);
    }

    const category = this.categoryRepository.create({
      name: data.name,
    });

    return await this.categoryRepository.save(category);
  }

  async findAll(): Promise<Category[]> {
    return await this.categoryRepository.find();
  }

  async findById(id: number): Promise<Category> {
    const category = await this.categoryRepository.findOne({
      where: {
        id,
      },
    });

    if (!category) {
      throw new AppError("Categoria não encontrada", 404);
    }

    return category;
  }

  async update(
    id: number,
    data: UpdateCategoryDTO
  ): Promise<Category> {
    const category = await this.categoryRepository.findOne({
      where: {
        id,
      },
    });

    if (!category) {
      throw new AppError("Categoria não encontrada", 404);
    }

    if (data.name !== category.name) {
      const existingCategory = await this.categoryRepository.findOne({
        where: {
          name: data.name,
        },
      });

      if (existingCategory) {
        throw new AppError("Categoria já cadastrada", 409);
      }
    }

    category.name = data.name;

    return await this.categoryRepository.save(category);
  }

  async delete(id: number): Promise<void> {
    const category = await this.categoryRepository.findOne({
      where: {
        id,
      },
    });

    if (!category) {
      throw new AppError("Categoria não encontrada", 404);
    }

    await this.categoryRepository.remove(category);
  }
}