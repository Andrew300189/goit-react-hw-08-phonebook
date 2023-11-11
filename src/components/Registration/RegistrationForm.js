import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { register } from 'redux/authSlice';
import styles from './RegistrationForm.module.css';

const RegistrationForm = () => {
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = e => {
    e.preventDefault();

    dispatch(
      register({
        name,
        email,
        password,
      })
    );
  };

  return (
    <div className={styles.container}>
      <h2>Register</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label className={styles.formLabel}>
          Name
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} className={styles.formInput} />
        </label>
        <br />
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
          Register
        </button>
      </form>
    </div>
  );
};

export default RegistrationForm;
