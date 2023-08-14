import { useCallback } from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const checkAuth = useCallback(() => {
    return localStorage.getItem("user") !== null;
  }, []);

  const isLoggedIn = checkAuth();

  return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
