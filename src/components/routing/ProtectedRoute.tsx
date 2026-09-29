import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import SplashScreen from "../common/SplashScreen";

/** Only renders its children for signed-in users; everyone else goes to the landing page */
function ProtectedRoute({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) return <SplashScreen />;
  if (!user) return <Navigate to="/" replace />;

  return children;
}

export default ProtectedRoute;
