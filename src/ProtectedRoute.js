

import React from "react";
import { useAuth } from "./AuthContext";
import { Navigate } from "react-router-dom";
import { home, signup } from "./Components/constent/Routes";

const ProtectedRoute = ({ component }) => {
  const { authenticated } = useAuth();

  return authenticated ? component : <Navigate to={signup} />;
};

export default ProtectedRoute;
