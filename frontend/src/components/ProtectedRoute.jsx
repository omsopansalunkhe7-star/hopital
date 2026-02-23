import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const email = localStorage.getItem('email');
  const sessionKey = localStorage.getItem('sessionKey');

  if (!email || !sessionKey) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;