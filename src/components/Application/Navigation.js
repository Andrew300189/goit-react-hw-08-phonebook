import React from 'react';
import { NavLink } from 'react-router-dom';
import UserMenu from '../UserMenu/UserMenu';

const Navigation = () => {

  return (
    <div>
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
            <UserMenu />
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navigation;
