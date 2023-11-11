import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUserEmail } from '../../redux/selectors';
import UserMenu from '../UserMenu/UserMenu';
import styles from './Navigation.module.css';

const Navigation = () => {
  const userEmail = useSelector(selectUserEmail);

  return (
    <div className={styles.navContainer}>
      <nav>
        <ul className={styles.navList}>
          <li>
          <NavLink to="/" exact="true" activeClassName="active">
              Home
            </NavLink>
          </li>
          {userEmail && (
            <>
              <li>
                <NavLink to="/contacts" activeClassName="active">
                  Contacts
                </NavLink>
              </li>
              <li>
                <UserMenu />
              </li>
            </>
          )}
          {!userEmail && (
            <>
              <li>
                <NavLink to="/register" activeClassName="active">
                  Registration
                </NavLink>
              </li>
              <li>
                <NavLink to="/login" activeClassName="active">
                  Login
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Navigation;
