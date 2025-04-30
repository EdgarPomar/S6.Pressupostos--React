import React, { useState } from 'react'
import ServiceSelector from './components/ServiceSelector'
import { Service } from './types'
import './styles.css'

const App: React.FC = () => {
  const [services, setServices] = useState<Service[]>([
    { id: 'seo', name: 'Seo', price: 300, selected: false },
    { id: 'ads', name: 'Ads', price: 400, selected: false },
    { id: 'web', name: 'Web', price: 500, selected: false }
  ])

  const handleToggle = (id: string) => {
    const updated = services.map(service =>
      service.id === id ? { ...service, selected: !service.selected } : service
    )
    setServices(updated)
  }

  const total = services
    .filter(service => service.selected)
    .reduce((sum, service) => sum + service.price, 0)

  return (
    <main>
      <h1>Aconsegueix la millor qualitat</h1>
      <div className="service-list">
        {services.map(service => (
          <ServiceSelector
            key={service.id}
            service={service}
            onToggle={handleToggle}
          />
        ))}
      </div>
      <div className="total">Preu pressupostat: {total} €</div>
    </main>
  )
}

export default App
