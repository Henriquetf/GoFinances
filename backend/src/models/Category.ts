import { Entity } from 'typeorm';

@Entity('categories')
class Category {
  id!: string;

  title!: string;

  createdAt!: string;

  updatedAt!: string;
}

export default Category;
