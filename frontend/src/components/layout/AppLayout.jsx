import { Outlet } from "react-router-dom";
import Header from "./Header.jsx";
import Nav from "./Nav.jsx";

function AppLayout() {
    return (
        <>
            <Header />
            <Nav />
            <Outlet />
        </>
    );
}

export default AppLayout;