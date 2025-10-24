import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, role }) => {
  const user = JSON.parse(localStorage.getItem('user'));

  if (!user) {
    return <Navigate to="/signup" />; // If no user is logged in, send to signup/login page
  }

  if (role && user.role !== role) {
    return <Navigate to="/" />; // Redirect to home if role doesn't match
  }

  return children;
};

export default ProtectedRoute;