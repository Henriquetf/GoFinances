import Transaction, { TransactionType } from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

export interface CreateTransactionData {
  title: string;
  type: TransactionType;
  value: number;
}

class TransactionRepository {
  private readonly transactions: Transaction[] = [];

  public findAll(): Transaction[] {
    return this.transactions;
  }

  public findByType(type: TransactionType): Transaction[] {
    return this.transactions.filter((transaction) => transaction.type === type);
  }

  public getBalance(): Balance {
    const incomeTotal = this.findByType(TransactionType.INCOME)
      .map((transaction) => transaction.value)
      .reduce((sum, income) => sum + income, 0);

    const outcomeTotal = this.findByType(TransactionType.OUTCOME)
      .map((transaction) => transaction.value)
      .reduce((sum, outcome) => sum + outcome, 0);

    const currentBalance = incomeTotal - outcomeTotal;

    return {
      income: incomeTotal,
      outcome: outcomeTotal,
      total: currentBalance,
    };
  }

  public create({ title, type, value }: CreateTransactionData): Transaction {
    const newTransaction = new Transaction();

    newTransaction.title = title;
    newTransaction.type = type;
    newTransaction.value = value;

    this.transactions.push(newTransaction);

    return newTransaction;
  }
}

export default TransactionRepository;
