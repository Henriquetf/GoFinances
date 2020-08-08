import { Router } from 'express';

import TransactionRepository from '../repositories/TransactionRepository';
import CreateTransactionService from '../services/CreateTransactionService';

const transactionRepository = new TransactionRepository();
const createTransactionService = new CreateTransactionService(
  transactionRepository,
);

const transactionRouter = Router();

transactionRouter.get('/', (request, response) => {
  const transactions = transactionRepository.findAll();
  const currentBalance = transactionRepository.getBalance();

  return response.json({
    transactions,
    balance: currentBalance,
  });
});

transactionRouter.post('/', (request, response) => {
  const { title, type, value } = request.body;

  const newTransaction = createTransactionService.execute({
    title,
    type,
    value,
  });

  return response.json(newTransaction);
});

export default transactionRouter;
