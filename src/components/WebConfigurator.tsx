import React from 'react'
import { WebConfig } from '../types'

interface Props {
  config: WebConfig
  onChange: (newConfig: WebConfig) => void
}

const WebConfigurator: React.FC<Props> = ({ config, onChange }) => {
  const handleChange = (field: keyof WebConfig, value: number) => {
    if (value >= 0) {
      onChange({ ...config, [field]: value })
    }
  }

  return (
      <div className="web-config">
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
      </div>
  )
}

export default WebConfigurator
