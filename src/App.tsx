import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import './styles.css'
import AppRoutes from './router/AppRouter'

const App: React.FC = () => (
  <BrowserRouter>
    <AppRoutes />
  </BrowserRouter>
)

export default App
