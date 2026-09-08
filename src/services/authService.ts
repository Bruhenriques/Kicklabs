import { AppDataSource } from "../database/data-source";
import { User } from "../models/User";
import { LoginDTO } from "../dtos/authDto";
import { AppError } from "../errors/AppError";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export class AuthService {
  private userRepository = AppDataSource.getRepository(User);

  async login(data: LoginDTO) {
    const user = await this.userRepository.findOne({
      where: { email: data.email },
    });

    if (!user) {
      throw new AppError("E-mail ou senha inválidos", 401);
    }

    const passwordMatch = await bcrypt.compare(
      data.password,
      user.password
    );

    if (!passwordMatch) {
      throw new AppError("E-mail ou senha inválidos", 401);
    }

    const secret = process.env.JWT_SECRET;

    if (!secret) {
      throw new AppError("JWT_SECRET não configurado", 500);
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      secret,
      {
        expiresIn: "1h",
      }
    );

    return {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    };
  }
}