import React from 'react'

interface Props {
  name: string
  onChange: (value: string) => void
  onSave: () => void
}

const BudgetForm: React.FC<Props> = ({ name, onChange, onSave }) => {
  return (
      <div>
        <input
            type="text"
            placeholder="Nom del pressupost"
            value={name}
            onChange={e => onChange(e.target.value)}
        />
        <button onClick={onSave}>Desar pressupost</button>
      </div>
  )
}

export default BudgetForm
