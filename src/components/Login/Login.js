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

        history.push('/contacts'); 
      } else {
        console.error('Login failed. Unexpected response status:', action.error.message);
      }
    } catch (error) {
      console.error('Login failed:', error.message);
    }
  };

  return (
    <div className={styles.form}>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <label className={styles.label}>
          Email
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <br />
        <label className={styles.label}>
          Password
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <br />
        <button type="submit" className={styles.button}>Login</button>
      </form>
    </div>
  );
};

export default Login;
