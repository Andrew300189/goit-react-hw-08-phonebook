import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { registerStart, registerSuccess, registerFailure } from '../../redux/authSlice';

const RegistrationForm = ({ onClose }) => {
  const history = useNavigate();
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      if (!name || !email || !password) {
        console.error('Name, email, and password are required');
        return;
      }

      dispatch(registerStart());

      const userData = {
        name,
        email,
        password,
      };

      const response = await axios.post('https://connections-api.herokuapp.com/users/signup', userData);

      if (response.status === 201) {
        dispatch(
          registerSuccess({
            user: {
              name: response.data.name,
              email: response.data.email,
            },
            token: 'jwt_token',
          })
        );

        onClose();
        history.push('/login');
      } else {
        console.error('Registration failed. Unexpected response status:', response.status);
        dispatch(registerFailure('Registration failed'));
      }
    } catch (error) {
      console.error('Registration failed:', error.message);
      dispatch(registerFailure(error.message));
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <label>
          Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <br />
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
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegistrationForm;
