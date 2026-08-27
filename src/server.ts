import "reflect-metadata";
import express from "express";
import cors from "cors";

import { AppDataSource } from "./database/data-source";

import userRoutes from "./routes/userRoutes";
import categoryRoutes from "./routes/categoryRoutes";
import productRoutes from "./routes/productRoutes";
import orderRoutes from "./routes/orderRoutes";

import { errorMiddleware } from "./middlewares/errorMiddleware";

const app = express();

app.use(cors());
app.use(express.json());

app.use(userRoutes);
app.use(categoryRoutes);
app.use(productRoutes);
app.use(orderRoutes);

app.use(errorMiddleware);

const PORT = 3000;

AppDataSource.initialize()
  .then(() => {
    console.log("Banco de dados conectado!");

    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  })
  .catch((error) => {
    console.error(
      "Erro ao conectar com o banco de dados:",
      error
    );
  });