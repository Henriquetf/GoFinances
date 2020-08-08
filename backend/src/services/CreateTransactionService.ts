import AppError from '../errors/AppError';
import Transaction, { TransactionType } from '../models/Transaction';
import CategoryRepository from '../repositories/CategoryRepository';
import TransactionsRepository, {
  CreateTransactionData as RepositoryCreateTransactionData,
} from '../repositories/TransactionsRepository';

interface CreateTransactionData extends RepositoryCreateTransactionData {
  category: string;
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  private categoryRepository: CategoryRepository;

  constructor(
    transactionsRepository: TransactionsRepository,
    categoryRepository: CategoryRepository,
  ) {
    this.transactionsRepository = transactionsRepository;
    this.categoryRepository = categoryRepository;
  }

  public async execute({
    title,
    type,
    value,
    category,
  }: CreateTransactionData): Promise<Transaction> {
    if (type === TransactionType.OUTCOME) {
      const currentBalance = await this.transactionsRepository.getBalance();

      if (value > currentBalance.total) {
        throw new AppError('Not enough balance available.');
      }
    }

    const transactionCategory = await this.categoryRepository.findByTitleOrCreate(
      category,
    );

    const newTransaction = this.transactionsRepository.create({
      title,
      type,
      value,
      category: transactionCategory,
    });

    await this.transactionsRepository.save(newTransaction);

    return newTransaction;
  }
}

export default CreateTransactionService;
