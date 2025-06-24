import { useUser } from "../context/UserContext";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useUser();

  // ✅ Wait until user context is fully loaded
  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "3rem" }}>
        <p style={{ fontSize: "1.1rem" }}>🔐 Checking your session...</p>
      </div>
    );
  }

  // ✅ Redirect if not logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // ✅ Allow access
  return children;
};

export default ProtectedRoute;
