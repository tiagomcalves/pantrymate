import {createContext, useContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";

export const SessionContext = createContext(null);

const SessionManager = ({ children }) => {

    const URL_USER = 'http://localhost:8000/account/api/user/';
    const URL_LOGIN = 'http://localhost:8000/account/api/login/';
    const URL_LOGOUT = 'http://localhost:8000/account/api/logout/';

    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(URL_USER, { withCredentials: true })
            .then(result => {
                setCurrentUser(result.data);
            })
            .catch(() => {
                setCurrentUser(null);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    const handleLogin = async(username, password) => {
        try {
            // console.log("user: ", username, " pw: ", password);
            const result = await axios.post(
                URL_LOGIN,
                {username, password},
                {
                    headers:
                        {'X-CSRFToken': getCSRFToken(), 'Content-Type': 'application/json'},
                    withCredentials: true
                }
            );

            if( result.status === 200)  //  We got a sucessfull login, lets fetch the user info for the first time
            {
                const user_obj_fetch = await axios.get(URL_USER, { withCredentials: true});
                setCurrentUser((user_obj_fetch.data));
                return true;
            }

            return false;

        } catch {
            // console.log("login failed");
            return false;
        }
    };

    const getCSRFToken = () => {
        return document.cookie.split('; ')
        .find(row => row.startsWith('csrftoken='))
        ?.split('=')[1];
        }

    const handleLogout = async () => {
        try {
            await axios.get(URL_LOGOUT, { withCredentials: true });
            setCurrentUser(null);
            return true;
        } catch (err) {
            // console.log("logout failed");
            return false;
        }
    };

    return (
        <SessionContext.Provider value={{ currentUser, loading, handleLogin, handleLogout }}>
            {children}
        </SessionContext.Provider>
    );
};
export default SessionManager;

export const getCurrentSession = () => useContext(SessionContext);