import React, {useEffect, useState} from "react";

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
            <h4>{strUsername}!</h4>
        </>
    );
}

export default WelcomeUser;