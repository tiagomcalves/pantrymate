import {Navigate, Outlet} from "react-router-dom";
import {getCurrentSession} from "../../features/SessionManager.jsx";


const ProtectedRoute = () => {
    const { currentUser, loading } = getCurrentSession();

    if (loading) {
        return null;
    }

    if (!currentUser) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;