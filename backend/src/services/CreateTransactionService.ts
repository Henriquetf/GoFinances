import Transaction, { CreateTransactionData } from '../models/Transaction';
import TransactionRepository from '../repositories/TransactionRepository';

class CreateTransactionService {
  private transactionRepository: TransactionRepository;

  constructor(transactionRepository: TransactionRepository) {
    this.transactionRepository = transactionRepository;
  }

  public execute({ title, type, value }: CreateTransactionData): Transaction {
    if (type === 'outcome') {
      const currentBalance = this.transactionRepository.getBalance();

      if (value > currentBalance.total) {
        throw new Error('Not enough balance available.');
      }
    }

    const newTransaction = this.transactionRepository.create({
      title,
      type,
      value,
    });

    return newTransaction;
  }
}

export default CreateTransactionService;
