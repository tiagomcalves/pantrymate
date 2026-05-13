import {createContext, useContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";

export const SessionContext = createContext(null);

const SessionManager = ({ children }) => {

    const URL_USER = 'http://localhost:8000/account/api/user/';
    const URL_LOGIN = 'http://localhost:8000/account/api/login/';
    const URL_LOGOUT = 'http://localhost:8000/account/api/logout/';

    const [currentUser, setCurrentUser] = useState(null);

    const handleLogin = async (email, password) => {
        try {
            // await axios.post(
            //     URL_LOGIN,
            //     {email, password},
            //     {withCredentials: true}
            // );

            setCurrentUser(email);
            return true;

        } catch (err) {
            console.log("login failed");
            return false;
        }
    };

    const handleLogout = () => {
        // axios.get(URL_LOGOUT, {withCredentials: true})
        // .then( () => setCurrentUser(null))
        // .catch( () => console.log('logout failed'));
        setCurrentUser(null)
        return true;
    };

    return (
        <SessionContext.Provider value={{ currentUser, handleLogin, handleLogout }}>
            {children}
        </SessionContext.Provider>
    );
};
export default SessionManager;

export const getCurrentSession = () => useContext(SessionContext);