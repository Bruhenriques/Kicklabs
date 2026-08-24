import { Router } from "express";
import { CategoryController } from "../controllers/categoryController";

const categoryRoutes = Router();

const categoryController = new CategoryController();

categoryRoutes.post("/categories", (req, res) =>
  categoryController.create(req, res)
);

categoryRoutes.get("/categories", (req, res) =>
  categoryController.findAll(req, res)
);

categoryRoutes.get("/categories/:id", (req, res) =>
  categoryController.findById(req, res)
);

categoryRoutes.put("/categories/:id", (req, res) =>
  categoryController.update(req, res)
);

categoryRoutes.delete("/categories/:id", (req, res) =>
  categoryController.delete(req, res)
);

export default categoryRoutes;