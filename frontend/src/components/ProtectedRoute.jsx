import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, requiredRole }) => {
  const email = localStorage.getItem('email');
  const sessionKey = localStorage.getItem('sessionKey');
  const userRole = localStorage.getItem('userRole');

  if (!email || !sessionKey) {
    // Redirect to appropriate login page based on role
    if (requiredRole) {
      return <Navigate to={`/${requiredRole}/login`} />;
    }
    return <Navigate to="/" />;
  }

  // Check if user has required role
  if (requiredRole && userRole !== requiredRole) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;