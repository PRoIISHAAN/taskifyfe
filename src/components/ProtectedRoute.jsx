import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

axios.defaults.withCredentials = true;

export function ProtectedRoute({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    async function checkAuth() {
      try {
        const response = await axios.get("/user/getuserinfo", {
          withCredentials: true,
        });
        // If successful, user is authenticated
        setIsAuthenticated(true);
      } catch (error) {
        // If 403 or any error, user is not authenticated
        // Redirect to login with next param to return after auth
        const currentPath = location.pathname + location.search;
        navigate(`/login?next=${encodeURIComponent(currentPath)}`);
        setIsAuthenticated(false);
      }
    }

    checkAuth();
  }, [navigate, location]);

  // Show loading state while checking authentication
  if (isAuthenticated === null) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // If authentication check passed, render the protected component
  // If not authenticated, this won't render as user was redirected
  return isAuthenticated ? children : null;
}
