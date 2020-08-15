import React from 'react';

import { NavLink } from 'react-router-dom';

import logo from '../../assets/logo.svg';
import styles from './Header.module.scss';

const Header: React.FC = () => {
  return (
    <section className={styles.header}>
      <div className={styles.navbar}>
        <img src={logo} alt="GoFinances" />

        <div>
          <NavLink
            to="/"
            exact
            className={styles['navbar-item']}
            activeClassName={styles['navbar-item--active']}
          >
            Listagem
          </NavLink>
          <NavLink
            to="/import"
            exact
            className={styles['navbar-item']}
            activeClassName={styles['navbar-item--active']}
          >
            Importar
          </NavLink>
        </div>
      </div>
    </section>
  );
};

export default Header;
