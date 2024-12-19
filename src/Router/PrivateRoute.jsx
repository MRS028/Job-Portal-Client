import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import AuthContext from "../Context/AuthContext/AuthContext";
import Loading from "../pages/Loader/Loading";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    return <Loading />;
  }

  if (user && user.email) {
    return children; 
  }

  return <Navigate state={ location.pathname }  to="/signin"  />;
};

export default PrivateRoute;