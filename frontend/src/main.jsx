import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import Home from './pages/Landpage.jsx'
import SuggestionPage from './pages/SuggestionPage.jsx'

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/suggestion" element={<SuggestionPage />} />
        </Routes>
    </BrowserRouter>
)