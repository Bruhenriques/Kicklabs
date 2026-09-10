import { Router } from "express";

import { UserController } from "../controllers/userController";
import { authMiddleware } from "../middlewares/authMiddleware";

const userRoutes = Router();

const userController = new UserController();

userRoutes.post(
  "/users",
  authMiddleware,
  (req, res) => userController.create(req, res)
);

userRoutes.get(
  "/users",
  (req, res) => userController.findAll(req, res)
);

userRoutes.get(
  "/users/:id",
  (req, res) => userController.findById(req, res)
);

userRoutes.put(
  "/users/:id",
  authMiddleware,
  (req, res) => userController.update(req, res)
);

userRoutes.delete(
  "/users/:id",
  authMiddleware,
  (req, res) => userController.delete(req, res)
);

export default userRoutes;