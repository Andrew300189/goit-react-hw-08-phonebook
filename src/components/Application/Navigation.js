import React from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

const Navigation = () => {
  const handleLogout = async () => {
    try {
      await axios.post('https://connections-api.herokuapp.com/users/logout', null, {
        headers: {
          Authorization: 'Bearer jwt_token',
        },
      });

      console.log('User logged out successfully');
      
    } catch (error) {
      console.error('Logout failed:', error.message);
    }
  };

  return (
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
          <button onClick={handleLogout}>Logout</button>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
