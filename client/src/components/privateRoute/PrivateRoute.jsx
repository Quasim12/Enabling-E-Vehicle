// src/components/PrivateRoute.js
import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const dealerInfo = localStorage.getItem("dealerInfo");

  return dealerInfo ? children : <Navigate to="/dealerLogin" />;
};

export default PrivateRoute;