import Transaction, {
  CreateTransactionData,
  AllowedTransactionTypes,
} from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionRepository {
  private readonly transactions: Transaction[] = [];

  public findAll(): Transaction[] {
    return this.transactions;
  }

  public findByType(type: AllowedTransactionTypes): Transaction[] {
    return this.transactions.filter((transaction) => transaction.type === type);
  }

  public getBalance(): Balance {
    const incomeTotal = this.findByType('income')
      .map((transaction) => transaction.value)
      .reduce((sum, income) => sum + income, 0);

    const outcomeTotal = this.findByType('outcome')
      .map((transaction) => transaction.value)
      .reduce((sum, outcome) => sum + outcome, 0);

    const currentBalance = incomeTotal - outcomeTotal;

    return {
      income: incomeTotal,
      outcome: outcomeTotal,
      total: currentBalance,
    };
  }

  public create(createRepositoryData: CreateTransactionData): Transaction {
    const newTransaction = new Transaction(createRepositoryData);

    this.transactions.push(newTransaction);

    return newTransaction;
  }
}

export default TransactionRepository;
