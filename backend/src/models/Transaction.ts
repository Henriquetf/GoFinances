import { uuid } from 'uuidv4';

export type AllowedTransactionTypes = 'income' | 'outcome';

export type CreateTransactionData = Omit<Transaction, 'id'>;

class Transaction {
  readonly id: string;

  title: string;

  value: number;

  type: AllowedTransactionTypes;

  constructor({ title, type, value }: CreateTransactionData) {
    this.id = uuid();
    this.title = title;
    this.type = type;
    this.value = value;
  }
}

export default Transaction;
