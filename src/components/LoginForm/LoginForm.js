import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginForm = ({ onClose }) => {
  const history = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://connections-api.herokuapp.com/users/login', {
        email,
        password,
      });

      if (response.status === 200) {
        const JwtToken = response.data.token;

        const userResponse = await axios.get('https://connections-api.herokuapp.com/users/current', {
          headers: {
            Authorization: `Bearer ${JwtToken}`,
          },
        });

        const contactsResponse = await axios.get('https://connections-api.herokuapp.com/contacts', {
          headers: {
            Authorization: `Bearer ${JwtToken}`,
          },
        });

        onClose({
          user: {
            name: userResponse.data.name,
            email: userResponse.data.email,
          },
          token: JwtToken,
          contacts: contactsResponse.data,
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