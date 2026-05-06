import React, {useEffect, useState} from "react";
import {Badge} from "reactstrap";

const WelcomeUser = () => {

    const [strUsername, setUsername] = useState("Visitante");
    // const mock_user = {'username': 'Moita'}
    const mock_user = {}

    useEffect(() => {
      const data = mock_user;   //  fetch with API later

      if (data.username) {
        setUsername(data.username);
      }
    }, []);

    return (
        <>
            <h3>Bom dia,</h3>
            <div style={{ display: "flex"}} >
                <h4>{strUsername}!</h4>
                <div style={{margin: "5px 20px"}}>
                    <Badge color="success" pill style={{ height: "22px"}}>status</Badge>
                </div>
            </div>
        </>
    );
}

export default WelcomeUser;