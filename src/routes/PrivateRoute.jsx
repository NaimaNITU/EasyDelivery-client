import React from "react";
import useAuth from "../hooks/useAuth";
import Loading from "./../components/Loading";
import { Navigate } from "react-router";

const PrivateRoute = ({ children }) => {
  const { loading, user } = useAuth();

  if (loading) {
    return Loading;
  }
  if (!user) {
    return <Navigate to="/auth/login" />;
  }
  return children;
};

export default PrivateRoute;
