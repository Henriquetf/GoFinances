import {
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

import Category from './Category';

export enum TransactionType {
  INCOME = 'income',
  OUTCOME = 'outcome',
}

@Entity('transactions')
class Transaction {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({
    type: 'varchar',
    length: 200,
  })
  title!: string;

  @Column({
    type: 'enum',
    enum: TransactionType,
    enumName: 'transaction_type',
  })
  type!: TransactionType;

  @Column({
    type: 'numeric',
    precision: 20,
    scale: 2,
  })
  value!: number;

  @ManyToOne(() => Category, {
    onUpdate: 'CASCADE',
  })
  @JoinColumn({
    name: 'category_id',
    referencedColumnName: 'id',
  })
  category!: Category;

  @Column({ name: 'category_id' })
  categoryId!: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;
}

export default Transaction;
