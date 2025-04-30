import React from 'react'
import { Service } from '../types'

interface Props {
  service: Service
  onToggle: (id: string) => void
}

const ServiceSelector: React.FC<Props> = ({ service, onToggle }) => {
  return (
    <div className="service">
      <span>{service.name}</span>
      <span>{service.price} €</span>
      <input
        type="checkbox"
        checked={service.selected}
        onChange={() => onToggle(service.id)}
      />
    </div>
  )
}

export default ServiceSelector
