import React from 'react'
import { useNavigate } from 'react-router-dom'

const Welcome: React.FC = () => {
  const navigate = useNavigate()

  return (
    <main>
      <h1>Benvingut/da a la nostra Calculadora de Serveis</h1>
      <p>
        Aquesta web et permet seleccionar serveis digitals i configurar la teva pròpia pàgina web.
        Podràs veure el preu total en funció dels serveis i opcions que triïs.
      </p>
      <button onClick={() => navigate('/calculator')}>Comença</button>
    </main>
  )
}

export default Welcome
