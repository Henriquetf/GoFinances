import { Router } from 'express';

import TransactionRepository from '../repositories/TransactionRepository';
import CreateTransactionService from '../services/CreateTransactionService';

const transactionRepository = new TransactionRepository();
const createTransactionService = new CreateTransactionService(
  transactionRepository,
);

const transactionRouter = Router();

transactionRouter.get('/', (request, response) => {
  try {
    const transactions = transactionRepository.findAll();
    const currentBalance = transactionRepository.getBalance();

    return response.json({
      transactions,
      balance: currentBalance,
    });
  } catch (err) {
    return response.status(400).json({
      error: err.message,
    });
  }
});

transactionRouter.post('/', (request, response) => {
  try {
    const { title, type, value } = request.body;

    const newTransaction = createTransactionService.execute({
      title,
      type,
      value,
    });

    return response.json(newTransaction);
  } catch (err) {
    return response.status(400).json({
      error: err.message,
    });
  }
});

export default transactionRouter;
