import { EntityRepository, Repository } from 'typeorm';

import Transaction, { TransactionType } from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

export interface CreateTransactionData {
  title: string;
  type: TransactionType;
  value: number;
}

@EntityRepository(Transaction)
class TransactionsRepository extends Repository<Transaction> {
  public async getTotalByTransactionType(
    type: TransactionType,
  ): Promise<number> {
    const { sum } = await this.createQueryBuilder()
      .select(/* sql */ `SUM(value)`, 'sum')
      .where(`type = :type`, {
        type,
      })
      .getRawOne<{ sum: string | null }>();

    if (sum === null) {
      return 0;
    }

    return parseFloat(sum) || 0;
  }

  public async getBalance(): Promise<Balance> {
    const incomeTotal = await this.getTotalByTransactionType(
      TransactionType.INCOME,
    );
    const outcomeTotal = await this.getTotalByTransactionType(
      TransactionType.OUTCOME,
    );

    const currentBalance = incomeTotal - outcomeTotal;

    return {
      income: incomeTotal,
      outcome: outcomeTotal,
      total: currentBalance,
    };
  }
}

export default TransactionsRepository;
