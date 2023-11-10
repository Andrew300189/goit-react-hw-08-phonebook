import React from 'react';
import { NavLink } from 'react-router-dom';
import UserMenu from '../UserMenu/UserMenu'; // Импортируем компонент UserMenu

const Navigation = () => {

  return (
    <div>
      <h1>Welcome to the Contacts App</h1>
      <p>Please login or register to access your contacts.</p>
      <nav>
        <ul>
          <li>
            <NavLink to="/" exact activeClassName="active">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/register" activeClassName="active">
              Registration
            </NavLink>
          </li>
          <li>
            <NavLink to="/login" activeClassName="active">
              Login
            </NavLink>
          </li>
          <li>
            <NavLink to="/contacts" activeClassName="active">
              Contacts
            </NavLink>
          </li>
          <li>
            {/* Используем кнопку logout из UserMenu */}
            <UserMenu />
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navigation;
