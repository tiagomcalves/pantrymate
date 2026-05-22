import {Badge, Button} from "reactstrap";
import React, {useEffect, useState} from "react";
import bellIcon from '../../../assets/bell.svg'
import {useNavigate} from "react-router-dom";
import {getCurrentSession} from "../../../features/SessionManager.jsx";

const Notifications = () => {

    const navigate = useNavigate()
    const { alertas } = getCurrentSession();

    const alertCount = alertas?.length ?? 0;

    return (
        <Button color="secondary" outline onClick={() => navigate("/alertas")}>
            <img src={bellIcon} alt="Bell Icon" />{' '}
          <Badge>{alertCount}</Badge>
        </Button>
    );
}

export default Notifications;