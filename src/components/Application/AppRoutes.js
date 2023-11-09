
import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import ContactForm from '../ContactForm/ContactForm';
import ContactList from '../ContactList/ContactList';
import Filter from '../Filter/Filter';
import Register from '../UserData/Register';
import Login from '../UserData/Login';
import Contacts from '../UserData/Contacts';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/contacts" element={<Contacts />} />
      <Route path="/phonebook" element={
        <div>
          <ContactForm />
          <h2>Contacts</h2>
          <p>Find contacts by name</p>
          <Filter />
          <ContactList />
        </div>
      } />
      <Navigate to="/register" />
    </Routes>
  );
};

export default AppRoutes;

