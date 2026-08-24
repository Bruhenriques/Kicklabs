import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Category } from "./Category";

@Entity("products")
export class Product {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({ type: "text" })
  description!: string;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  price!: number;

  @Column()
  stock!: number;

  @Column()
  image!: string;

  @ManyToOne(() => Category)
  @JoinColumn({ name: "categoryId" })
  category!: Category;

  @Column()
  categoryId!: number;
}