import { Navigate } from "react-router-dom";

const isAuthenticated = () => {
  return !!localStorage.getItem("authToken");
};

const PrivateRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;