import { Router } from "express";

import { CategoryController } from "../controllers/categoryController";
import { authMiddleware } from "../middlewares/authMiddleware";

const categoryRoutes = Router();

const categoryController = new CategoryController();

categoryRoutes.post(
  "/categories",
  authMiddleware,
  (req, res) => categoryController.create(req, res)
);

categoryRoutes.get(
  "/categories",
  (req, res) => categoryController.findAll(req, res)
);

categoryRoutes.get(
  "/categories/:id",
  (req, res) => categoryController.findById(req, res)
);

categoryRoutes.put(
  "/categories/:id",
  authMiddleware,
  (req, res) => categoryController.update(req, res)
);

categoryRoutes.delete(
  "/categories/:id",
  authMiddleware,
  (req, res) => categoryController.delete(req, res)
);

export default categoryRoutes;