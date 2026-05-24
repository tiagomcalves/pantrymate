import {createContext, useContext, useEffect, useState} from "react";
import axios from "axios";
import {fetchAlerts} from "../context/Alertas.js";
import {fetchPedidos, criarPedido, atualizarEstado} from "../context/Pedidos.js";

export const SessionContext = createContext(null);

const SessionManager = ({ children }) => {

    const URL_USER = 'http://localhost:8000/account/api/user/';
    const URL_LOGIN = 'http://localhost:8000/account/api/login/';
    const URL_LOGOUT = 'http://localhost:8000/account/api/logout/';

    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const [alertas, setAlertas] = useState();
    const [pedidos, setPedidos] = useState([]);


    useEffect( () => {

    // console.log("SessionProvider mounted");
        loadData().then(r => []);

        const intervalo = setInterval(async () => {
            try {
                const alertas = await fetchAlerts();
                setAlertas(alertas)
            } catch (err) {
                console.error("Error fetching alerts: ", err);
            }
        }, 86400000); //24 horas
        return () => clearInterval(intervalo)
    }, []);

    const loadData = async () => {
                try {
                    const result = await axios.get(URL_USER, { withCredentials: true });

                    setCurrentUser(result.data);

                    const alerts = await fetchAlerts();
                    // console.log("alerts: ", alerts);
                    setAlertas(alerts);

                } catch (err) {
                    setCurrentUser(null);
                } finally {
                    setLoading(false);
                }
            };

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
                // const user_obj_fetch = await axios.get(URL_USER, { withCredentials: true});
                // setCurrentUser((user_obj_fetch.data));
                await loadData();
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
        <SessionContext.Provider value={{ currentUser, loading, handleLogin, handleLogout,
            alertas, setAlertas,
            pedidos, setPedidos, fetchPedidos, criarPedido, atualizarEstado }}>
            {children}
        </SessionContext.Provider>
    );
};
export default SessionManager;

export const getCurrentSession = () => useContext(SessionContext);