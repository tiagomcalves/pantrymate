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
            <Container style={{ maxWidth: "2560px"}}>
                <Header/>
                <Nav/>
                    <Routes>
                        <Route path="/" element={<Dashboard/>}/>
                        <Route path="/scanner" element={<Scanner/>}/>
                        <Route path="/recipes" element={<Recipes/>}/>
                        <Route path="/family" element={<Family/>}/>
                    </Routes>
                {/*<div className="position-fixed bottom-0 start-0 w-100">*/}
                {/*    <Footer/>*/}
                {/*</div>*/}
            </Container>
        </BrowserRouter>
    );
}

export default App
