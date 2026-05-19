import React, {useEffect, useState} from "react";
import {Badge} from "reactstrap";
import {getCurrentSession} from "../../../features/SessionManager.jsx";

const WelcomeUser = () => {

    const { currentUser } = getCurrentSession();

    return (
        <>
            <h3>Bom dia,</h3>
            <div style={{ display: "flex"}} >
                <h4>{currentUser.first_name}!</h4>
                <div style={{margin: "5px 20px"}}>
                    <Badge color="success" pill style={{ height: "22px"}}>status</Badge>
                </div>
            </div>
        </>
    );
}

export default WelcomeUser;