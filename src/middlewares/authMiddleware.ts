import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AppError } from "../errors/AppError";

export interface AuthRequest extends Request {
  user?: {
    id: number;
    email: string;
  };
}

export function authMiddleware(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  const authorization = req.headers.authorization;

  if (!authorization) {
    throw new AppError("Token não informado", 401);
  }

  const [, token] = authorization.split(" ");

  if (!token) {
    throw new AppError("Token inválido", 401);
  }

  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new AppError("JWT_SECRET não configurado", 500);
  }

  try {
    const decoded = jwt.verify(token, secret);

    if (typeof decoded === "string") {
      throw new AppError("Token inválido", 401);
    }

    req.user = {
      id: Number(decoded.id),
      email: String(decoded.email),
    };

    next();
  } catch {
    throw new AppError("Token inválido ou expirado", 401);
  }
}