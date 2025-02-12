

import React from "react";
import { useAuth } from "./AuthContext";
import { Navigate } from "react-router-dom";
import { home, loginRoute } from "./Components/constent/Routes";

const ProtectedRoute = ({ component }) => {
  const { authenticated } = useAuth();
  return authenticated ? component : <Navigate to={loginRoute} />;
};

export default ProtectedRoute;
