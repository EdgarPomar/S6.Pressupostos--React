import React, { useReducer, useMemo, useState } from 'react'
import ServiceSelector from './ServiceSelector'
import WebConfigurator from './WebConfigurator'
import { Service, WebConfig } from '../types'
import { useNavigate } from 'react-router-dom'

const initialServices: Service[] = [
    { id: 'seo', name: 'Seo', selected: false, price: 300 },
    { id: 'ads', name: 'Ads', selected: false, price: 400 },
    { id: 'web', name: 'Web', selected: false, price: 500 }
]

type Action = { type: 'TOGGLE'; id: string }

const reducer = (state: Service[], action: Action): Service[] =>
    state.map(service =>
        service.id === action.id ? { ...service, selected: !service.selected } : service
    )

type Quote = {
    name: string
    email: string
    phone: string
    services: string[]
    total: number
}

const Calculator: React.FC = () => {
    const navigate = useNavigate()
    const [services, dispatch] = useReducer(reducer, initialServices)
    const [webConfig, setWebConfig] = useState<WebConfig>({ pages: 1, languages: 1 })
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [error, setError] = useState('')
    const [quotes, setQuotes] = useState<Quote[]>([])

    const total = useMemo(() => {
        return services.reduce((sum, service) => {
            if (service.id === 'web' && service.selected) {
                return sum + 500 + (webConfig.pages + webConfig.languages) * 30
            } else if (service.selected && service.price) {
                return sum + service.price
            }
            return sum
        }, 0)
    }, [services, webConfig])

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        if (!name || !email || !phone) {
            setError('Tots els camps són obligatoris.')
            return
        }

        if (!/\S+@\S+\.\S+/.test(email)) {
            setError('El correu no és vàlid.')
            return
        }

        if (!/^\d{9}$/.test(phone)) {
            setError('El telèfon ha de tenir 9 dígits.')
            return
        }

        const selectedServices = services
            .filter(s => s.selected)
            .map(s => {
                if (s.id === 'web') {
                    return `Web (${webConfig.pages} pàgines, ${webConfig.languages} llenguatges)`
                }
                return s.name
            })

        const newQuote: Quote = {
            name,
            email,
            phone,
            services: selectedServices,
            total
        }

        setQuotes([...quotes, newQuote])
        setName('')
        setEmail('')
        setPhone('')
        setError('')
    }

    return (
        <main>
            <button onClick={() => navigate('/')}>← Tornar a l'inici</button>
            <h1>Calculadora de Serveis</h1>
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

            <h2 className="section-title">Demanar pressupost</h2>
            <form onSubmit={handleSubmit}>
                <input
                    className="input"
                    type="text"
                    placeholder="Nom"
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
                <input
                    className="input"
                    type="text"
                    placeholder="Telèfon"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                />
                <input
                    className="input"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                <button className="submit-btn" type="submit">
                    Sol·licitar pressupost →
                </button>
                {error && <div className="error">{error}</div>}
            </form>

            {quotes.length > 0 && (
                <>
                    <h2 className="section-title">Pressupostos en curs:</h2>
                    {quotes.map((q, i) => (
                        <div key={i} className="quote-card">
                            <div className="quote-left">
                                <div className="quote-name">{q.name}</div>
                                <div className="quote-email">{q.email}</div>
                                <div className="quote-phone">{q.phone}</div>
                            </div>
                            <div className="quote-services">
                                <div className="quote-services-title">Serveis contractats:</div>
                                <ul>
                                    {q.services.map((s, idx) => (
                                        <li key={idx}>{s}</li>
                                    ))}
                                </ul>
                            </div>
                            <div className="quote-total">{q.total} €</div>
                        </div>
                    ))}
                </>
            )}
        </main>
    )
}

export default Calculator
