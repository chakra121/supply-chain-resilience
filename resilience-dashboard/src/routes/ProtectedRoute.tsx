import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

export function ProtectedRoute({
  allowedRole,
  children,
}: {
  allowedRole: "analyst" | "executive";
  children: React.ReactNode;
}) {
  const { role } = useAuth();

  if (!role) return <Navigate to="/" replace />;
  if (role !== allowedRole) return <Navigate to="/" replace />;

  return <>{children}</>;
}
