import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../redux/userSlice';
import styles from './Login.module.css';

const Login = () => {
  const history = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      if (!email || !password) {
        console.error('Email and password are required');
        return;
      }

      const userData = {
        email,
        password,
      };

      const action = await dispatch(loginUser(userData));

      if (loginUser.fulfilled.match(action)) {
        const response = action.payload;

        console.log(response);

        history('/contacts'); 
      } else {
        console.error('Login failed. Unexpected response status:', action.error.message);
      }
    } catch (error) {
      console.error('Login failed:', error.message);
    }
  };

  return (
    <div className={styles.container}>
      <h2>Login</h2>
      <form onSubmit={handleLogin} className={styles.form}>
        <label className={styles.formLabel}>
          Email
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={styles.formInput} />
        </label>
        <br />
        <label className={styles.formLabel}>
          Password
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className={styles.formInput} />
        </label>
        <br />
        <button type="submit" className={styles.formButton}>
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
