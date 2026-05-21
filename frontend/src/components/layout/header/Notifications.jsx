import {Badge, Button} from "reactstrap";
import React, {useEffect, useState} from "react";
import bellIcon from '../../../assets/bell.svg'
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {useAlertasContext} from "../../../context/AlertasContext.jsx";

const Notifications = () => {

    const navigate = useNavigate()

    const {alertas} = useAlertasContext()

    const size = alertas.length

    return (
        <Button color="secondary" outline onClick={() => navigate("/alertas")}>
            <img src={bellIcon} alt="Bell Icon" />{' '}
          <Badge>{size}</Badge>
        </Button>
    );
}

export default Notifications;