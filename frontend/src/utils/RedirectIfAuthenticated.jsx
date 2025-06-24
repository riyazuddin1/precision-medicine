import { useUser } from "../context/UserContext";
import { Navigate } from "react-router-dom";

const RedirectIfAuthenticated = ({ children }) => {
  const { user, loading } = useUser();

  if (loading) return <p>Loading...</p>;

  return user ? <Navigate to="/dashboard" replace /> : children;
};

export default RedirectIfAuthenticated;
