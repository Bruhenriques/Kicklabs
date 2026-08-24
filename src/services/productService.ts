import { AppDataSource } from "../database/data-source";
import { Product } from "../models/Product";
import { Category } from "../models/Category";
import {
  CreateProductDTO,
  UpdateProductDTO,
} from "../dtos/productDto";
import { AppError } from "../errors/AppError";

export class ProductService {
  private productRepository = AppDataSource.getRepository(Product);
  private categoryRepository = AppDataSource.getRepository(Category);

  async create(data: CreateProductDTO): Promise<Product> {
    const category = await this.categoryRepository.findOne({
      where: {
        id: data.categoryId,
      },
    });

    if (!category) {
      throw new AppError("Categoria não encontrada", 404);
    }

    const product = this.productRepository.create({
      name: data.name,
      description: data.description,
      price: data.price,
      stock: data.stock,
      image: data.image,
      categoryId: data.categoryId,
    });

    return await this.productRepository.save(product);
  }

  async findAll(): Promise<Product[]> {
    return await this.productRepository.find({
      relations: {
        category: true,
      },
    });
  }

  async findById(id: number): Promise<Product> {
    const product = await this.productRepository.findOne({
      where: {
        id,
      },
      relations: {
        category: true,
      },
    });

    if (!product) {
      throw new AppError("Produto não encontrado", 404);
    }

    return product;
  }

  async update(
    id: number,
    data: UpdateProductDTO
  ): Promise<Product> {
    const product = await this.productRepository.findOne({
      where: {
        id,
      },
    });

    if (!product) {
      throw new AppError("Produto não encontrado", 404);
    }

    if (data.categoryId !== undefined) {
      const category = await this.categoryRepository.findOne({
        where: {
          id: data.categoryId,
        },
      });

      if (!category) {
        throw new AppError("Categoria não encontrada", 404);
      }

      product.categoryId = data.categoryId;
    }

    if (data.name !== undefined) {
      product.name = data.name;
    }

    if (data.description !== undefined) {
      product.description = data.description;
    }

    if (data.price !== undefined) {
      product.price = data.price;
    }

    if (data.stock !== undefined) {
      product.stock = data.stock;
    }

    if (data.image !== undefined) {
      product.image = data.image;
    }

    const updatedProduct = await this.productRepository.save(product);

    return await this.findById(updatedProduct.id);
  }

  async delete(id: number): Promise<void> {
    const product = await this.productRepository.findOne({
      where: {
        id,
      },
    });

    if (!product) {
      throw new AppError("Produto não encontrado", 404);
    }

    await this.productRepository.remove(product);
  }
}