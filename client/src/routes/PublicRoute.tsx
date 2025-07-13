import { Navigate } from "react-router-dom";
import { useAuth } from "../context/auth";

const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const auth = useAuth();
  const user = auth?.user;
  const loading = auth?.loading;

  if (loading) return <div className="text-center mt-12">Loading...</div>;
  if (user) return <Navigate to="/" replace />;
  return <>{children}</>;
};

export default PublicRoute;
