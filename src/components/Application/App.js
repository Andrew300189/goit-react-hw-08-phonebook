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

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const JwtToken = 'jwt_token';

        const userResponse = await axios.get('https://connections-api.herokuapp.com/users/current', {
          headers: {
            Authorization: `Bearer ${JwtToken}`,
          },
        });

        const contactsResponse = await axios.get('https://connections-api.herokuapp.com/contacts', {
          headers: {
            Authorization: `Bearer ${JwtToken}`,
          },
        });

        dispatch(
          loginSuccess({
            user: {
              name: userResponse.data.name,
              email: userResponse.data.email,
            },
            token: JwtToken,
            contacts: contactsResponse.data,
          })
        );
      } catch (error) {
        console.error('Error fetching user data:', error.message);
      }
    };

    fetchData();
  }, [dispatch]);

  return (
    <Router>
      <PersistGate loading={null} persistor={persistor}>
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          <Route path="/contacts" element={<ContactForm />} />
        </Routes>
        <UserMenu />
      </PersistGate>
    </Router>
  );
};

export default App;
