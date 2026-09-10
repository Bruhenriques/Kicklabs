import { Router } from "express";

import { OrderController } from "../controllers/orderController";
import { authMiddleware } from "../middlewares/authMiddleware";

const orderRoutes = Router();

const orderController = new OrderController();

orderRoutes.post(
  "/orders",
  authMiddleware,
  (req, res) => orderController.create(req, res)
);

orderRoutes.get(
  "/orders",
  (req, res) => orderController.findAll(req, res)
);

orderRoutes.get(
  "/orders/:id",
  (req, res) => orderController.findById(req, res)
);

orderRoutes.delete(
  "/orders/:id",
  authMiddleware,
  (req, res) => orderController.delete(req, res)
);

export default orderRoutes;