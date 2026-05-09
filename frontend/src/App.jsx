import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import React from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Scanner from "./pages/Scanner.jsx";
import Family from "./pages/Family.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Recipes from "./pages/Recipes.jsx";
import {Container} from "reactstrap";
import Header from "./components/layout/Header.jsx";
import Nav from "./components/layout/Nav.jsx";
import Footer from "./components/layout/Footer.jsx";

function App() {
    return (
        <BrowserRouter>
                <Header/>
                <Nav/>
                    <div style={{display: "flex", flexDirection: "row"}}>
                        <Container>
                            Column 1
                        </Container>
                        <Container style={{ width: "50%"}}>
                            <Routes>
                                <Route path="/" element={<Dashboard/>}/>
                                <Route path="/scanner" element={<Scanner/>}/>
                                <Route path="/recipes" element={<Recipes/>}/>
                                <Route path="/family" element={<Family/>}/>
                            </Routes>
                        </Container>
                        <Container>
                            Column 3
                        </Container>
                    </div>
                {/*<div className="position-fixed bottom-0 start-0 w-100">*/}
                {/*    <Footer/>*/}
                {/*</div>*/}
        </BrowserRouter>
    );
}

export default App
