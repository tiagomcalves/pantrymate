import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { UserProvider } from './context/UserContext'
import { PedidosProvider } from './context/PedidosContext'

createRoot(document.getElementById('root')).render(
    <UserProvider>
        <PedidosProvider>
            <App />
        </PedidosProvider>
    </UserProvider>
)
