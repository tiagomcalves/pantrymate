import {Navigate, Outlet} from "react-router-dom";
import {getCurrentSession} from "../../features/SessionManager.jsx";

const ProtectedRoute = () => {
    const loggedIn = getCurrentSession();

    console.log("logged in?", loggedIn );

    if (!loggedIn || loggedIn.currentUser == null)
        return <Navigate to="/login" replace />;
    return <Outlet />;
};

export default ProtectedRoute;