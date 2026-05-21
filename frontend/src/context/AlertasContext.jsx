import {createContext, useContext, useEffect, useState} from "react";
import axios from "axios";

const AlertasContext = createContext(null);

// eslint-disable-next-line react-refresh/only-export-components
export const useAlertasContext = () => useContext(AlertasContext);

const AlertasProvider = ({children}) => {

    const URL_DISPENSAALERTASDATA = "http://localhost:8000/products/api/items-dispensa/alertas/";

    const [alertas, setAlertas] = useState([]);

    const fetchAlertas = () => {
        axios.get(URL_DISPENSAALERTASDATA)
            .then((request) => {
                setAlertas(request.data)
            }).catch(error => console.error(error));
    }

    useEffect(() => {
        fetchAlertas()
    }, []);

    return (
        <AlertasContext.Provider value={{alertas, setAlertas}}>
            {children}
        </AlertasContext.Provider>
    );
};

export default AlertasProvider;