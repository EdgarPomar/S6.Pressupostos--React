import React from 'react'
import { WebConfig } from '../types/index'

interface Props {
  config: WebConfig
  onChange: (newConfig: WebConfig) => void
}

const WebConfigurator: React.FC<Props> = ({ config, onChange }) => {
  const handleChange = (field: keyof WebConfig, value: number) => {
    const valid = Math.max(0, value)
    onChange({ ...config, [field]: valid })
  }

  return (
    <div className="web-config">
      <label>
        Nombre de pàgines
        <div className="input-group">
          <button onClick={() => handleChange('pages', config.pages - 1)}>-</button>
          <input
            type="number"
            min={0}
            value={config.pages}
            onChange={e => handleChange('pages', Number(e.target.value))}
          />
          <button onClick={() => handleChange('pages', config.pages + 1)}>+</button>
        </div>
      </label>

      <label>
        Nombre de llenguatges
        <div className="input-group">
          <button onClick={() => handleChange('languages', config.languages - 1)}>-</button>
          <input
            type="number"
            min={0}
            value={config.languages}
            onChange={e => handleChange('languages', Number(e.target.value))}
          />
          <button onClick={() => handleChange('languages', config.languages + 1)}>+</button>
        </div>
      </label>
    </div>
  )
}

export default WebConfigurator
