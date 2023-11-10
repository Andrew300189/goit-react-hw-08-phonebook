import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserEmail, selectIsLoggedIn } from '../../redux/selectors';
import { logoutUser, clearCurrentUser } from '../../redux/userSlice'; 
import { useNavigate } from 'react-router-dom';
import styles from './UserMenu.module.css';

const UserMenu = () => {
  const dispatch = useDispatch();
  const userEmail = useSelector(selectUserEmail);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser());
      await dispatch(clearCurrentUser());
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error.message);
    }
  };

  return (
    <div className={styles.userMenuContainer}>
      {isLoggedIn && <p className={styles.welcomeMessage}>Welcome, {userEmail}</p>}
      <button className={styles.logoutButton} onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default UserMenu;
