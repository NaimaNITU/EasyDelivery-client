import React from "react";
import useAuth from "../hooks/useAuth";
import Loading from "./../components/Loading";
import { Navigate, useLocation } from "react-router";

const PrivateRoute = ({ children }) => {
  const { loading, user } = useAuth();
  const location = useLocation();
  console.log(location);

  if (loading) {
    return Loading;
  }
  if (!user) {
    return <Navigate to="/auth/login" state={{ from: location.pathname }} />;
  }
  return children;
};

export default PrivateRoute;
