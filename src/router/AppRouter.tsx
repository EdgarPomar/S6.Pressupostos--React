import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Welcome from '../pages/Welcome'
import Calculator from '../components/Calculator'

const AppRoutes: React.FC = () => (
  <Routes>
    <Route path="/" element={<Welcome />} />
    <Route path="/calculator" element={<Calculator />} />
  </Routes>
)

export default AppRoutes
