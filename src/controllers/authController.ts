import { Request, Response } from "express";
import { loginSchema } from "../dtos/authDto";
import { AuthService } from "../services/authService";

export class AuthController {
  private authService = new AuthService();

  async login(req: Request, res: Response): Promise<Response> {
    const data = loginSchema.parse(req.body);

    const result = await this.authService.login(data);

    return res.status(200).json(result);
  }
}