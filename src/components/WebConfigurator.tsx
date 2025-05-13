import React, { useState } from 'react'
import { WebConfig } from '../types'

interface Props {
  config: WebConfig
  onChange: (newConfig: WebConfig) => void
}

const WebConfigurator: React.FC<Props> = ({ config, onChange }) => {
  const [showHelp, setShowHelp] = useState(false)

  const handleChange = (field: keyof WebConfig, value: number) => {
    if (value >= 0) {
      onChange({ ...config, [field]: value })
    }
  }

  return (
    <div className="web-config">
      <div className="web-config-header">
        <h4>Configuració Web</h4>
        <button className="help-btn" onClick={() => setShowHelp(true)}>❓</button>
      </div>

      <label>
        Nombre de pàgines
        <div className="number-input">
          <button onClick={() => handleChange('pages', config.pages - 1)}>-</button>
          <input
            type="number"
            value={config.pages}
            min={0}
            onChange={e => handleChange('pages', Number(e.target.value))}
          />
          <button onClick={() => handleChange('pages', config.pages + 1)}>+</button>
        </div>
      </label>

      <label>
        Nombre de llenguatges
        <div className="number-input">
          <button onClick={() => handleChange('languages', config.languages - 1)}>-</button>
          <input
            type="number"
            value={config.languages}
            min={0}
            onChange={e => handleChange('languages', Number(e.target.value))}
          />
          <button onClick={() => handleChange('languages', config.languages + 1)}>+</button>
        </div>
      </label>

      {showHelp && (
        <div className="popup-overlay">
          <div className="popup">
            <h3>Ajuda</h3>
            <p><strong>Nombre de pàgines:</strong> Total de seccions diferents que tindrà la web (Ex: Inici, Serveis, Contacte...)</p>
            <p><strong>Nombre de llenguatges:</strong> Idiomes en què vols que la web estigui disponible (Ex: Català, Castellà, Anglès...)</p>
            <button onClick={() => setShowHelp(false)} className="close-btn">Tancar</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default WebConfigurator
