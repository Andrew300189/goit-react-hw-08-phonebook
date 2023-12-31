import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserEmail, selectIsLoggedIn } from '../../redux/selectors';
import { logoutUser, clearCurrentUser } from '../../redux/authSlice'; 
import styles from './UserMenu.module.css';

const UserMenu = () => {
  const dispatch = useDispatch();
  const userEmail = useSelector(selectUserEmail);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser());
      await dispatch(clearCurrentUser());
    } catch (error) {
      console.error('Logout failed:', error.message);
    }
  };

  return (
    <div className={styles.userMenuContainer}>
      {isLoggedIn && <p className={styles.welcomeMessage}>Welcome, {userEmail}</p>}
      <button className={styles.logoutButton} onClick={handleLogout}>
        Log Out
      </button>
    </div>
  );
};

export default UserMenu;
