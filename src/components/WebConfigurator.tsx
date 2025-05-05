import React from 'react'
import { WebConfig } from '../types'

interface Props {
  config: WebConfig
  onChange: (newConfig: WebConfig) => void
}

const WebConfigurator: React.FC<Props> = ({ config, onChange }) => {
  const handleChange = (field: keyof WebConfig, value: number) => {
    onChange({ ...config, [field]: value })
  }

  return (
    <div className="web-config">
      <label>
        Nombre de pàgines
        <input
          type="number"
          min={0}
          value={config.pages}
          onChange={e => handleChange('pages', Number(e.target.value))}
        />
      </label>
      <label>
        Nombre de llenguatges
        <input
          type="number"
          min={0}
          value={config.languages}
          onChange={e => handleChange('languages', Number(e.target.value))}
        />
      </label>
    </div>
  )
}

export default WebConfigurator
