import { Router } from 'express';
import { getCustomRepository } from 'typeorm';

import CategoryRepository from '../repositories/CategoryRepository';
import TransactionsRepository from '../repositories/TransactionsRepository';
import CreateTransactionService from '../services/CreateTransactionService';
import DeleteTransactionService from '../services/DeleteTransactionService';

const transactionRouter = Router();

transactionRouter.get('/', async (request, response) => {
  const transactionsRepository = getCustomRepository(TransactionsRepository);

  const transactions = await transactionsRepository.find();
  const currentBalance = await transactionsRepository.getBalance();

  return response.json({
    transactions,
    balance: currentBalance,
  });
});

transactionRouter.post('/', async (request, response) => {
  const { title, type, value, category } = request.body;

  const transactionsRepository = getCustomRepository(TransactionsRepository);
  const categoryRepository = getCustomRepository(CategoryRepository);
  const createTransactionService = new CreateTransactionService(
    transactionsRepository,
    categoryRepository,
  );

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

  const transactionsRepository = getCustomRepository(TransactionsRepository);
  const deleteTransactionService = new DeleteTransactionService(
    transactionsRepository,
  );

  await deleteTransactionService.execute(id);

  return response.status(204).send();
});

export default transactionRouter;
