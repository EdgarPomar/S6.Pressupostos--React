import React, { useReducer, useMemo, useState } from 'react'
import ServiceSelector from './components/ServiceSelector'
import WebConfigurator from './components/WebConfigurator'
import { Service, WebConfig } from '../src/types/index'
import './styles.css'

const initialServices: Service[] = [
  { id: 'seo', name: 'Seo', selected: false, price: 300 },
  { id: 'ads', name: 'Ads', selected: false, price: 400 },
  { id: 'web', name: 'Web', selected: false, price: 500 }
]

type Action = { type: 'TOGGLE'; id: string }

const reducer = (state: Service[], action: Action): Service[] =>
  state.map(service =>
    service.id === action.id
      ? { ...service, selected: !service.selected }
      : service
  )

const App: React.FC = () => {
  const [services, dispatch] = useReducer(reducer, initialServices)
  const [webConfig, setWebConfig] = useState<WebConfig>({ pages: 1, languages: 1 })

  const total = useMemo(() => {
    return services.reduce((sum, service) => {
      if (service.id === 'web' && service.selected) {
        const configPrice = 500 + (webConfig.pages + webConfig.languages) * 30
        return sum + configPrice
      } else if (service.selected && service.price) {
        return sum + service.price
      }
      return sum
    }, 0)
  }, [services, webConfig])

  return (
    <main>
      <h1>Aconsegueix la millor qualitat</h1>
      <div className="service-list">
        {services.map(service => (
          <ServiceSelector
            key={service.id}
            service={service}
            onToggle={id => dispatch({ type: 'TOGGLE', id })}
          >
            {service.id === 'web' && service.selected && (
              <WebConfigurator config={webConfig} onChange={setWebConfig} />
            )}
          </ServiceSelector>
        ))}
      </div>
      <div className="total">Preu pressupostat: {total} €</div>
    </main>
  )
}

export default App
