import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import axios from 'axios'
import SessionManager from "./features/SessionManager.jsx";

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
    <SessionManager>
        <App/>
    </SessionManager>
)
