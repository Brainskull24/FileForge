import { Navigate } from "react-router-dom";
import { useAuth } from "../context/auth";
import { Loader2 } from "lucide-react";

const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const auth = useAuth();
  const user = auth?.user;
  const loading = auth?.loading;

  if (loading)
    return (
      <div className="fixed inset-0 flex flex-col items-center justify-center bg-background z-50">
        <Loader2 className="h-8 w-8 animate-spin text-primary mb-2" />
        <p className="text-sm text-muted-foreground">Loading...</p>
      </div>
    );
  if (user) return <Navigate to="/" replace />;
  return <>{children}</>;
};

export default PublicRoute;
