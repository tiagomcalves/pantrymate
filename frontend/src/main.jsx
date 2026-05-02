import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { UserProvider } from './context/UserContext'
import { PedidosProvider } from './context/PedidosContext'
import ProtectedRoute from './components/ProtectedRoute'
import AppShell from './components/AppShell'
import Dashboard from './components/Content'
import LoginPage from './pages/LoginPage'
import ListaComprasPage from './pages/ListaComprasPage'
import ScannerPage from './pages/ScannerPage'
import FamiliaPage from './pages/FamiliaPage'
import PedidosPage from './pages/PedidosPage'

createRoot(document.getElementById('root')).render(
    <UserProvider>
        <PedidosProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={<LoginPage />} />
                    <Route
                        path="/"
                        element={
                            <ProtectedRoute>
                                <AppShell />
                            </ProtectedRoute>
                        }
                    >
                        <Route index element={<Dashboard />} />
                        <Route path="compras"  element={<ListaComprasPage />} />
                        <Route path="scanner"  element={<ScannerPage />} />
                        <Route path="familia"  element={<FamiliaPage />} />
                        <Route path="pedidos"  element={<PedidosPage />} />
                    </Route>
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </BrowserRouter>
        </PedidosProvider>
    </UserProvider>
)
