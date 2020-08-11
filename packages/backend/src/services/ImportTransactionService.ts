import { createReadStream } from 'fs';

import { parse } from '@fast-csv/parse';
import { getCustomRepository } from 'typeorm';

import Transaction, { TransactionType } from '../models/Transaction';

import CategoriesRepository from '../repositories/CategoriesRepository';
import TransactionsRepository from '../repositories/TransactionsRepository';

interface CSVTransaction {
  title: string;
  type: TransactionType;
  value: number;
  category: string;
}

class ImportTransactionService {
  public async execute(filepath: string): Promise<Transaction[]> {
    const categoriesRepository = getCustomRepository(CategoriesRepository);
    const transactionsRepository = getCustomRepository(TransactionsRepository);

    const parseCSV = parse({
      headers: true,
      trim: true,
    });

    const transactions: CSVTransaction[] = [];

    const stream = createReadStream(filepath).pipe(parseCSV);

    stream.on('data', (row: CSVTransaction) => {
      transactions.push(row);
    });

    await new Promise((resolve) => stream.on('end', resolve));

    const categories = await Promise.all(
      transactions
        .map((transaction) => transaction.category)
        .map((category) => categoriesRepository.findByTitleOrCreate(category)),
    );

    const newTransactions = transactionsRepository.create(
      transactions.map((transaction, index) => {
        return {
          ...transaction,
          category: categories[index],
        };
      }),
    );

    await transactionsRepository.save(newTransactions);

    return newTransactions;
  }
}

export default ImportTransactionService;
