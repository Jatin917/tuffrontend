/* eslint-disable react/prop-types */
// import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ element: Component, isAuthenticated }) => {
  if(isAuthenticated) return Component;
  return <Navigate to="/admin-login"/>
};

export default PrivateRoute;
