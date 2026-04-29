import 'bootstrap/dist/css/bootstrap.min.css'
import { Container } from "reactstrap";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer.jsx";

const AppShell = () => {
    return (
        <Container style={{ marginTop: "20px", marginBottom: "80px", maxWidth: "800px" }}>
            <Header />
            <hr />
            <Outlet />
            <div className="position-fixed bottom-0 start-0 w-100">
                <Footer />
            </div>
        </Container>
    );
};

export default AppShell;
