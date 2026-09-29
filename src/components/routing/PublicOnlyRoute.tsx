import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import SplashScreen from "../common/SplashScreen";

/** Sends signed-in users straight to the library instead of the marketing page */
function PublicOnlyRoute({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) return <SplashScreen />;
  if (user) return <Navigate to="/browse" replace />;

  return children;
}

export default PublicOnlyRoute;
