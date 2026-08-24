import { AppDataSource } from "../database/data-source";
import { User } from "../models/User";
import {
  CreateUserDTO,
  UpdateUserDTO,
} from "../dtos/userDto";
import bcrypt from "bcryptjs";
import { AppError } from "../errors/AppError";

export class UserService {
  private userRepository = AppDataSource.getRepository(User);

  async create(data: CreateUserDTO): Promise<User> {
    const existingUser = await this.userRepository.findOne({
      where: {
        email: data.email,
      },
    });

    if (existingUser) {
      throw new AppError("E-mail já cadastrado", 409);
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = this.userRepository.create({
      name: data.name,
      email: data.email,
      password: hashedPassword,
    });

    return await this.userRepository.save(user);
  }

  async findAll(): Promise<Omit<User, "password">[]> {
    const users = await this.userRepository.find();

    return users.map(({ password, ...user }) => user);
  }

  async findById(id: number): Promise<Omit<User, "password">> {
    const user = await this.userRepository.findOne({
      where: {
        id,
      },
    });

    if (!user) {
      throw new AppError("Usuário não encontrado", 404);
    }

    const { password, ...userWithoutPassword } = user;

    return userWithoutPassword;
  }

  async update(
    id: number,
    data: UpdateUserDTO
  ): Promise<Omit<User, "password">> {
    const user = await this.userRepository.findOne({
      where: {
        id,
      },
    });

    if (!user) {
      throw new AppError("Usuário não encontrado", 404);
    }

    if (data.email && data.email !== user.email) {
      const existingUser = await this.userRepository.findOne({
        where: {
          email: data.email,
        },
      });

      if (existingUser) {
        throw new AppError("E-mail já cadastrado", 409);
      }
    }

    if (data.name !== undefined) {
      user.name = data.name;
    }

    if (data.email !== undefined) {
      user.email = data.email;
    }

    if (data.password !== undefined) {
      user.password = await bcrypt.hash(data.password, 10);
    }

    const updatedUser = await this.userRepository.save(user);

    const { password, ...userWithoutPassword } = updatedUser;

    return userWithoutPassword;
  }

  async delete(id: number): Promise<void> {
    const user = await this.userRepository.findOne({
      where: {
        id,
      },
    });

    if (!user) {
      throw new AppError("Usuário não encontrado", 404);
    }

    await this.userRepository.remove(user);
  }
}