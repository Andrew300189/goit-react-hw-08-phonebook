
import { BrowserRouter as Router } from 'react-router-dom';
import React from 'react';
import Navigation from '../Application/Navigation';
import AppRoutes from '../Application/AppRoutes';
import './App.module.css';

function App() {
  return (
    <Router>
      <div>
        <h1>Phonebook</h1>
        <Navigation />
        <AppRoutes />
      </div>
    </Router>
  );
}

export default App;