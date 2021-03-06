import React, { useMemo } from 'react';

import formatValue from '../../utils/formatValue';
import styles from './Card.module.scss';

const typeStyles = {
  outcome: 'card--outcome',
  total: 'card--total',
} as const;

interface CardProps {
  title: string;
  money?: number;
  type?: keyof typeof typeStyles;
  icon?: React.ComponentType;
  moneyTestid?: string;
}

const Card: React.FC<CardProps> = ({
  title,
  money,
  type,
  icon: Icon,
  moneyTestid,
}) => {
  const formattedMoney = useMemo(() => {
    if (money === undefined) {
      return '-';
    }

    return formatValue(money);
  }, [money]);

  const stylesModifier = type ? styles[typeStyles[type]] : '';

  return (
    <div className={`${styles.card} ${stylesModifier}`}>
      <div className={styles.header}>
        <span className={styles.title}>{title}</span>
        {Icon && <Icon />}
      </div>

      <span className={styles.money} data-testid={moneyTestid}>
        {formattedMoney}
      </span>
    </div>
  );
};

export default Card;
