import React from 'react';

import Card from '../../components/Card';

import Header from '../../components/Header';
import ArrowDownCircleIcon from '../../components/Icons/ArrowDownCircleIcon';
import ArrowUpCircleIcon from '../../components/Icons/ArrowUpCircleIcon';
import MoneyIcon from '../../components/Icons/MoneyIcon';

import styles from './Home.module.scss';

const Home: React.FC = () => {
  return (
    <>
      <Header />
      <div className={styles.container}>
        <div className={styles.cardContainer}>
          <Card title="Entradas" money={17400} icon={ArrowUpCircleIcon} />
          <Card
            title="Saídas"
            money={17400}
            type="outcome"
            icon={ArrowDownCircleIcon}
          />
          <Card title="Total" money={17400} type="total" icon={MoneyIcon} />
        </div>

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
            <tr className={styles.transactionsTable__row}>
              <td className={styles.transactionsTable__title}>
                Desenvolvimento de site
              </td>
              <td className={styles.transactionsTable__price}>R$ 12.000,00</td>
              <td className={styles.transactionsTable__category}>Venda</td>
              <td className={styles.transactionsTable__date}>13/04/2020</td>
            </tr>
            <tr className={styles.transactionsTable__row}>
              <td className={styles.transactionsTable__title}>
                Desenvolvimento de site
              </td>
              <td className={styles.transactionsTable__price}>R$ 12.000,00</td>
              <td className={styles.transactionsTable__category}>Venda</td>
              <td className={styles.transactionsTable__date}>13/04/2020</td>
            </tr>
            <tr className={styles.transactionsTable__row}>
              <td className={styles.transactionsTable__title}>
                Desenvolvimento de site
              </td>
              <td className={styles.transactionsTable__price}>R$ 12.000,00</td>
              <td className={styles.transactionsTable__category}>Venda</td>
              <td className={styles.transactionsTable__date}>13/04/2020</td>
            </tr>
            <tr className={styles.transactionsTable__row}>
              <td className={styles.transactionsTable__title}>
                Desenvolvimento de site
              </td>
              <td className={styles.transactionsTable__price}>R$ 12.000,00</td>
              <td className={styles.transactionsTable__category}>Venda</td>
              <td className={styles.transactionsTable__date}>13/04/2020</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Home;
