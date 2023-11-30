import React, { useEffect, Suspense } from 'react';
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
import Loader from 'components/Loader/Loader';

const App = () => {
  const dispatch = useDispatch();
  const fetchCurrentUser = useSelector(state => state.auth.fetchCurrentUser);

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

  return (
    <>
      <Navigation />
      <Suspense fallback={<Loader />}>
        {!fetchCurrentUser ? (
          <Routes>
            <Route path="/" element={<HomePage />} />
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
                <RestrictedRoute
                  redirectTo="/contacts"
                  component={<Login />}
                />
              }
            />
            <Route
              path="/contacts"
              element={
                <PrivateRoute
                  redirectTo="/login"
                  component={<ContactForm />}
                />
              }
            />
          </Routes>
        ) : null}
      </Suspense>
    </>
  );
};

export default App;
