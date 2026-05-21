import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {UserProvider} from './context/UserContext'
import {PedidosProvider} from './context/PedidosContext'
import axios from 'axios'
import AlertasProvider from "./context/AlertasContext.jsx";

axios.interceptors.request.use(config => {
    const csrfToken = document.cookie
        .split('; ')
        .find(row => row.startsWith('csrftoken='))
        ?.split('=')[1];
    if (csrfToken) {
        config.headers['X-CSRFToken'] = csrfToken;
    }
    return config;
});

createRoot(document.getElementById('root')).render(
    <UserProvider>
        <PedidosProvider>
            <AlertasProvider>
                <App/>
            </AlertasProvider>
        </PedidosProvider>
    </UserProvider>
)
