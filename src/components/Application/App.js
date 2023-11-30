import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Navigation from '../Navigation/Navigation';
import Registration from '../Registration/Registration';
import Login from '../Login/Login';
import ContactForm from '../ContactForm/ContactForm';
import HomePage from '../../pages/HomePage';
import { RestrictedRoute } from 'components/RestrictedRoute/RestrictedRoute';
import { PrivateRoute } from 'components/PrivateRoute/PrivateRoute';
import { getCurrentUser } from 'redux/authSlice';

const App = () => {
  const dispatch = useDispatch();
  const fetchCurrentUser = useSelector(state => state.auth.fetchCurrentUser);

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

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
    </>
  );
};

export default App;
