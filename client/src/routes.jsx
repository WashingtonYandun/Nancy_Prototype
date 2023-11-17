import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./context/authContext";

export const ProtectedRoute = () => {
    const { isAuthenticated, loading } = useAuth();

    if (loading) return <h1>Loading...</h1>;
    if (!isAuthenticated && !loading) return <Navigate to="/login" replace />;
    return <Outlet />;
};

export const RoleProtectedRoute = () => {
    const { user, loading } = useAuth();

    if (loading) return <h1>Loading...</h1>;
    if (!loading && user.role !== "admin")
        return <Navigate to="/notes" replace />;
    return <Outlet />;
};
