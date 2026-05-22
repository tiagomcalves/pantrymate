import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import React from "react";
import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
import { Container } from "reactstrap";
import Header from "./components/layout/Header.jsx";
import Nav from "./components/layout/Nav.jsx";
import SessionManager from "./features/SessionManager.jsx";
import ProtectedRoute from "./components/common/ProtectedRoute.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Dispensa from "./pages/Dispensa.jsx";
import Recipes from "./pages/Recipes.jsx";
import ScannerPage from "./pages/ScannerPage.jsx";
import FamiliaPage from "./pages/FamiliaPage.jsx";
import ListaComprasPage from "./pages/ListaComprasPage.jsx";
import PedidosPage from "./pages/PedidosPage.jsx";
import SuggestionPage from "./pages/SuggestionPage.jsx";
import RecipeDetailPage from "./pages/RecipeDetailPage.jsx";
import AlertasPage from "./pages/AlertasPage.jsx";

const AppShell = () => (
    <Container style={{ maxWidth: "2560px" }}>
        <Header />
        <Nav />
        <Outlet />
    </Container>
);

function App() {
    return (
        <BrowserRouter>
            <SessionManager>
                <Routes>
                    <Route path="/login" element={<LoginPage />} />
                    <Route element={<ProtectedRoute />}>
                        <Route element={<AppShell />}>
                            <Route index element={<Dashboard />} />
                            <Route path="dispensa" element={<Dispensa />} />
                            <Route path="scanner" element={<ScannerPage />} />
                            <Route path="recipes" element={<Recipes />} />
                            <Route path="family" element={<FamiliaPage />} />
                            <Route path="compras" element={<ListaComprasPage />} />
                            <Route path="pedidos" element={<PedidosPage />} />
                            <Route path="suggestions" element={<SuggestionPage />} />
                            <Route path="alertas" element={<AlertasPage/>} />
                            <Route path="recipes/:id" element={<RecipeDetailPage />} />
                        </Route>
                    </Route>
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </SessionManager>
        </BrowserRouter>
    );
}

export default App
