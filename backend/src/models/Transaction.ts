import {
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum TransactionType {
  INCOME = 'income',
  OUTCOME = 'outcome',
}

@Entity('transactions')
class Transaction {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  title!: string;

  @Column()
  type!: TransactionType;

  @Column({ type: 'numeric' })
  value!: number;

  @Column({ name: 'category_id' })
  categoryId!: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;
}

export default Transaction;
