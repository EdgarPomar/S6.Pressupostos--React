import React from 'react'
import { Service } from '../types'

interface Props {
    service: Service
    onToggle: (id: string) => void
    children?: React.ReactNode
}

const ServiceSelector: React.FC<Props> = ({ service, onToggle, children }) => {
    const descriptions: Record<string, string> = {
        Seo: "Programació d’una web responsive completa",
        Ads: "Programació d’una web responsive completa",
        Web: "Configuració personalitzada de pàgines i idiomes"
    }

    return (
        <div className={`service ${service.selected ? 'selected' : ''}`}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <strong>{service.name}</strong>
                    <div style={{ color: '#666', marginTop: '4px' }}>
                        {descriptions[service.name] || ''}
                    </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '24px', fontWeight: 'bold' }}>{service.price} €</div>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '6px' }}>
                        <input
                            type="checkbox"
                            checked={service.selected}
                            onChange={() => onToggle(service.id)}
                        />
                        Afegir
                    </label>
                </div>
            </div>

            {service.selected && service.name === 'Web' && children}
        </div>
    )
}

export default ServiceSelector
