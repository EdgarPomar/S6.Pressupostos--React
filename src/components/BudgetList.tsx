import React from 'react'
import { Budget } from '../types'

interface Props {
    budgets: Budget[]
}

const BudgetList: React.FC<Props> = ({ budgets }) => {
    if (budgets.length === 0) return <p>No hi ha pressupostos guardats.</p>

    return (
        <div>
            <h2>Llistat de pressupostos</h2>
            <ul>
                {budgets.map((b, i) => (
                    <li key={i}>
                        <strong>{b.name}</strong> - {b.total} € ({b.date})
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default BudgetList
