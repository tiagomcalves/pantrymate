import {Button} from "reactstrap";
import React from "react";
import {useNavigate} from "react-router-dom";
import axios from 'axios';
import {getCurrentSession} from "../../../features/SessionManager.jsx";

const Logout = () => {

    const navigate = useNavigate();

    const currentSession = getCurrentSession();

    const handleSubmit = () => {
        const success = currentSession.handleLogout();
        console.log(("logout success: "+ success));
        if (success) {
            navigate("/", { replace: true });
        }
    };

    return (
        <Button
            outline
            color="secondary"
            size="sm"
            onClick={handleSubmit}
            title="Sair"
        >
            <i className="bi bi-box-arrow-right"/>
        </Button>
    )
}
export default Logout;