import React from 'react';
import { useNavigate } from 'react-router-dom';
import Login from './Login';

const LoginPage = () => {
  const navigate = useNavigate();

  const handleRedirect = (route) => {
    
    navigate(route);
  };

  return <Login onRedirect={handleRedirect} />;
};

export default LoginPage;