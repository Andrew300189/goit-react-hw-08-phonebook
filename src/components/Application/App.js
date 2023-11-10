import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from '../../redux/store';
import { loginSuccess } from '../../redux/authSlice';
import Navigation from './Navigation';
import UserMenu from '../UserMenu/UserMenu';
import Registration from '../Registration/Registration';
import Login from '../Login/Login';
import ContactForm from '../ContactForm/ContactForm';
import HomePage from '../Application/HomePage';
import { RestrictedRoute } from 'components/RestrictedRoute/RestrictedRoute';
import { PrivateRoute } from 'components/PrivateRoute/PrivateRoute';

const App = () => {
  const dispatch = useDispatch();

  return (
    <>
      <Navigation />
      <Routes>
        <Route index element={<HomePage />} />
        <Route
          path="/register"
          element={
            <RestrictedRoute
              redirectTo="/contacts"
              component={<Registration />}
            />
          }
        />
        <Route
          path="/login"
          element={
            <RestrictedRoute redirectTo="/contacts" component={<Login />} />
          }
        />
        <Route
          path="/contacts"
          element={
            <PrivateRoute redirectTo="/login" component={<ContactForm />} />
          }
        />
      </Routes>
      <UserMenu />
    </>
  );
};

export default App;
