import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { registerUser } from '../redux/contactsSlice'; // Замените путь на соответствующий

const Register = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      return;
    }

    dispatch(registerUser({ name, email, password }))
      .unwrap()
      .then((/* обработка успешной регистрации пользователя */) => {
        // Перенаправление на страницу логина после успешной регистрации
      })
      .catch((/* обработка ошибки регистрации пользователя */) => {
        // Обработка ошибки регистрации
      });
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;