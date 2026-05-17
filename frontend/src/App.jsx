import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import React from "react";
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import Scanner from "./pages/Scanner.jsx";
import Family from "./pages/Family.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Recipes from "./pages/Recipes.jsx";
import {Container} from "reactstrap";
import Dispensa from "./pages/Dispensa.jsx";
import Login from "./pages/Login.jsx";
import SessionManager from "./features/SessionManager.jsx";
import ProtectedRoute from "./components/common/ProtectedRoute.jsx";
import AppLayout from "./components/layout/AppLayout.jsx";
import SuggestionPage from "./pages/SuggestionPage.jsx";

function App() {
    return (
        <BrowserRouter>
            <SessionManager>
                <Container style={{ maxWidth: "2560px" }}>
                    <Routes>

                        {/* Public route */}
                        <Route path="/login" element={<Login />} />

                        {/* Protected layout */}
                        <Route element={<ProtectedRoute />}>
                            <Route element={<AppLayout />}>
                                <Route path="/" element={<Dashboard />} />
                                <Route path="/dispensa" element={<Dispensa />} />
                                <Route path="/scanner" element={<Scanner />} />
                                <Route path="/recipes" element={<Recipes />} />
                                <Route path="/family" element={<Family />} />
                            </Route>
                        </Route>

                        {/* fallback */}
                        <Route path="*" element={<Navigate to="/" replace />} />

                    </Routes>
                </Container>
            </SessionManager>
        </BrowserRouter>
    );
}

export default App
