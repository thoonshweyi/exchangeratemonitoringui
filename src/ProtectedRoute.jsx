import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "./auth/api";
import { AuthProvider } from './context/AuthContext';

function ProtectedRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  useEffect(() => {
    api.get("/me")
      .then((res) => {
        setUser(res.data);
        
        setIsAuth(true);
      })
      .catch(() => setIsAuth(false))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Checking authentication...</p>;

  return isAuth ? <AuthProvider user={user} token={token}>{children}</AuthProvider> : <Navigate to="/login" />;
}

export default ProtectedRoute;