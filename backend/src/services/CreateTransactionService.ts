import { getCustomRepository } from 'typeorm';

import AppError from '../errors/AppError';

import Transaction, { TransactionType } from '../models/Transaction';

import CategoriesRepository from '../repositories/CategoriesRepository';
import TransactionsRepository, {
  CreateTransactionData as RepositoryCreateTransactionData,
} from '../repositories/TransactionsRepository';

interface CreateTransactionData extends RepositoryCreateTransactionData {
  category: string;
}

class CreateTransactionService {
  public async execute({
    title,
    type,
    value,
    category,
  }: CreateTransactionData): Promise<Transaction> {
    const transactionsRepository = getCustomRepository(TransactionsRepository);

    if (type === TransactionType.OUTCOME) {
      const currentBalance = await transactionsRepository.getBalance();

      if (value > currentBalance.total) {
        throw new AppError('Not enough balance available.');
      }
    }

    const categoriesRepository = getCustomRepository(CategoriesRepository);

    const transactionCategory = await categoriesRepository.findByTitleOrCreate(
      category,
    );

    const newTransaction = transactionsRepository.create({
      title,
      type,
      value,
      category: transactionCategory,
    });

    await transactionsRepository.save(newTransaction);

    return newTransaction;
  }
}

export default CreateTransactionService;
