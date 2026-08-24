import { Request, Response } from "express";
import { UserService } from "../services/userService";
import {
  createUserSchema,
  userIdSchema,
  updateUserSchema,
} from "../dtos/userDto";

export class UserController {
  private userService = new UserService();

  async create(req: Request, res: Response): Promise<Response> {
    const data = createUserSchema.parse(req.body);

    const user = await this.userService.create(data);

    const { password, ...userWithoutPassword } = user;

    return res.status(201).json(userWithoutPassword);
  }

  async findAll(req: Request, res: Response): Promise<Response> {
    const users = await this.userService.findAll();

    return res.status(200).json(users);
  }

  async findById(req: Request, res: Response): Promise<Response> {
    const { id } = userIdSchema.parse(req.params);

    const user = await this.userService.findById(id);

    return res.status(200).json(user);
  }

  async update(req: Request, res: Response): Promise<Response> {
    const { id } = userIdSchema.parse(req.params);

    const data = updateUserSchema.parse(req.body);

    const user = await this.userService.update(id, data);

    return res.status(200).json(user);
  }

  async delete(req: Request, res: Response): Promise<Response> {
    const { id } = userIdSchema.parse(req.params);

    await this.userService.delete(id);

    return res.status(204).send();
  }
}