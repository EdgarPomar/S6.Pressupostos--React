import React from 'react'
import { Service } from '../types'

interface Props {
  service: Service
  onToggle: (id: string) => void
  children?: React.ReactNode
}

const ServiceSelector: React.FC<Props> = ({ service, onToggle, children }) => {
  const descriptions: Record<string, string> = {
    Seo: "Millora del posicionament als cercadors (SEO).",
    Ads: "Gestió i execució de campanyes publicitàries.",
    Web: "Configuració personalitzada de pàgines i idiomes."
  }

 return (
  <div className={`service ${service.selected ? 'selected' : ''}`}>
    <div className="service-col service-info">
      <strong>{service.name}</strong>
      <div className="service-description">
        {descriptions[service.name] || ''}
      </div>
    </div>

    <div className="service-col service-price">
      <div>{service.price} €</div>
    </div>

    <div className="service-col service-checkbox">
      <label>
        <input
          type="checkbox"
          checked={service.selected}
          onChange={() => onToggle(service.id)}
        />
        <span>Afegir</span>
      </label>
    </div>

    {service.selected && service.name === 'Web' && children}
  </div>
)

}

export default ServiceSelector
