import React from 'react'
import { Service } from '../types'

interface Props {
  service: Service
  onToggle: (id: string) => void
  children?: React.ReactNode
}

const ServiceSelector: React.FC<Props> = ({ service, onToggle, children }) => {
  return (
    <div className={`service ${service.selected ? 'selected' : ''}`}>
      <div>
        <strong>{service.name}</strong>
        {service.name && <span> - {service.price} €</span>}
      </div>
      <label>
        <input
          type="checkbox"
          checked={service.selected}
          onChange={() => onToggle(service.id)}
        />{' '}
        Afegir
      </label>
      {service.selected && service.name === 'Web' && children}
    </div>
  )
}

export default ServiceSelector
