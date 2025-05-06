import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Welcome from "./pages/Welcome.tsx";
import Calculator from "./components/Calculator.tsx";

const AppRouter: React.FC = () => (
    <Router>
        <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/calculator" element={<Calculator />} />
        </Routes>
    </Router>
)

export default AppRouter
