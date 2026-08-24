import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import { AppError } from "../errors/AppError";

export function errorMiddleware(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
): Response {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      status: "error",
      message: error.message,
    });
  }

  if (error instanceof ZodError) {
    return res.status(422).json({
      status: "error",
      message: "Dados inválidos",
      errors: error.issues,
    });
  }

  console.error(error);

  return res.status(500).json({
    status: "error",
    message: "Erro interno do servidor",
  });
}