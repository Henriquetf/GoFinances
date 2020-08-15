import React, { useState, useEffect } from 'react';

import Card from '../../components/Card';

import Header from '../../components/Header';
import ArrowDownCircleIcon from '../../components/Icons/ArrowDownCircleIcon';
import ArrowUpCircleIcon from '../../components/Icons/ArrowUpCircleIcon';
import MoneyIcon from '../../components/Icons/MoneyIcon';

import { listTransactions } from '../../services/api/transaction';
import formatValue from '../../utils/formatValue';
import styles from './Home.module.scss';

interface Transaction {
  id: string;
  title: string;
  formattedValue: string;
  category: string;
}

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

const Home: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [balance, setBalance] = useState<Balance>({
    income: 0,
    outcome: 0,
    total: 0,
  });

  useEffect(() => {
    async function getTransactions() {
      const response = await listTransactions();

      const responseTransactions = response.data.transactions;
      const responseBalance = response.data.balance;

      setTransactions(
        responseTransactions.map(({ id, value, title, type, category }) => {
          const isOutcome = type === 'outcome';
          const formattedValue = formatValue(Number(value) || 0);

          return {
            id,
            title,
            isOutcome: type === 'outcome',
            category: category.title,
            formattedValue: isOutcome ? `- ${formattedValue}` : formattedValue,
          };
        }),
      );

      setBalance(responseBalance);
    }

    getTransactions();
  }, []);

  return (
    <>
      <Header />

      <div className={styles.outerCardContainer}>
        <div className={styles.cardContainer}>
          <Card
            title="Entradas"
            money={balance.income}
            icon={ArrowUpCircleIcon}
            moneyTestid="balance-income"
          />
          <Card
            title="Saídas"
            money={balance.outcome}
            type="outcome"
            icon={ArrowDownCircleIcon}
            moneyTestid="balance-outcome"
          />
          <Card
            title="Total"
            money={balance.total}
            type="total"
            icon={MoneyIcon}
            moneyTestid="balance-total"
          />
        </div>
      </div>

      <div className={styles.container}>
        <table className={styles.transactionsTable}>
          <thead className={styles.transactionsTable__header}>
            <tr>
              <th>Título</th>
              <th>Preço</th>
              <th>Categoria</th>
              <th>Data</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map(({ id, title, formattedValue, category }) => (
              <tr key={id} className={styles.transactionsTable__row}>
                <td className={styles.transactionsTable__title}>{title}</td>
                <td className={styles.transactionsTable__price}>
                  {formattedValue}
                </td>
                <td className={styles.transactionsTable__category}>
                  {category}
                </td>
                <td className={styles.transactionsTable__date} />
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Home;
