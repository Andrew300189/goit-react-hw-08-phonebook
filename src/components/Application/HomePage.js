
import React from 'react';
import { NavLink } from 'react-router-dom';

const HomePage = () => (
  <div>
    <h1>Welcome to the Contacts App</h1>
    <p>Please login or register to access your contacts.</p>
    <div>
      <NavLink to="/login">
        <button>Login</button>
      </NavLink>
      <NavLink to="/register">
        <button>Register</button>
      </NavLink>
    </div>
  </div>
);

export default HomePage;
