import React, {useEffect, useState} from "react";
import {Badge} from "reactstrap";
import {getCurrentSession} from "../../../features/SessionManager.jsx";

const WelcomeUser = () => {

    const { currentUser } = getCurrentSession();

    // These must be refactored out
    const roleLabel = { admin: "Administrador", member: "Membro", junior: "Júnior" };
    const roleColor = { admin: "success", member: "primary", junior: "warning" };

    return (
        <>
            <h3>Bom dia,</h3>
            <div style={{ display: "flex"}} >
                <h4>{currentUser.first_name}!</h4>
                <div style={{margin: "5px 20px"}}>
                    <Badge color={roleColor[currentUser.role]} pill style={{ height: "22px"}}>
                        {roleLabel[currentUser.role]}
                    </Badge>
                </div>
            </div>
        </>
    );
}

export default WelcomeUser;