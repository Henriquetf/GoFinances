import AppError from '../errors/AppError';
import TransactionsRepository from '../repositories/TransactionsRepository';

class DeleteTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public async execute(id: string): Promise<void> {
    const transaction = await this.transactionsRepository.findOne(id, {
      select: ['id'],
    });

    if (!transaction) {
      throw new AppError('Transaction not found.');
    }

    await this.transactionsRepository.remove(transaction);
  }
}

export default DeleteTransactionService;
