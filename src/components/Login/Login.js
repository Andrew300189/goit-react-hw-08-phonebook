import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../redux/authSlice';

const LoginForm = ({ onClose }) => {
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

      const response = await axios.post('https://connections-api.herokuapp.com/users/login', {
        email,
        password,
      });

      if (response.status === 200) {
        onClose({
          user: {
            name: response.data.name,
            email: response.data.email,
          },
          token: 'jwt_token',
        });

        history.push('/contacts');
      } else {
        console.error('Login failed. Unexpected response status:', response.status);
      }
    } catch (error) {
      console.error('Login failed:', error.message);

    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <label>
          Email:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <br />
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
