import { Router } from 'express';
import multer from 'multer';
import { getCustomRepository } from 'typeorm';

import uploadConfig from '../config/upload';

import TransactionsRepository from '../repositories/TransactionsRepository';

import CreateTransactionService from '../services/CreateTransactionService';
import DeleteTransactionService from '../services/DeleteTransactionService';
import ImportTransactionService from '../services/ImportTransactionService';

const upload = multer(uploadConfig);

const transactionRouter = Router();

transactionRouter.get('/', async (request, response) => {
  const transactionsRepository = getCustomRepository(TransactionsRepository);

  const transactions = await transactionsRepository.listTransactions();
  const currentBalance = await transactionsRepository.getBalance();

  return response.json({
    transactions,
    balance: currentBalance,
  });
});

transactionRouter.post('/', async (request, response) => {
  const { title, type, value, category } = request.body;

  const createTransactionService = new CreateTransactionService();

  const newTransaction = await createTransactionService.execute({
    title,
    type,
    value,
    category,
  });

  return response.json(newTransaction);
});

transactionRouter.delete('/:id', async (request, response) => {
  const { id } = request.params;

  const deleteTransactionService = new DeleteTransactionService();

  await deleteTransactionService.execute(id);

  return response.status(204).send();
});

transactionRouter.post(
  '/import',
  upload.single('file'),
  async (request, response) => {
    const importTransactionService = new ImportTransactionService();

    const transactions = await importTransactionService.execute(
      request.file.path,
    );

    return response.json(transactions);
  },
);

export default transactionRouter;
