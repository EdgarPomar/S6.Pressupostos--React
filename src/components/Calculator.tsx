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
    createdAt: number
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
    const [sortMode, setSortMode] = useState<'none' | 'name' | 'date'>('none')
    const [searchTerm, setSearchTerm] = useState('')

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
            total,
            createdAt: Date.now()
        }

        setQuotes([...quotes, newQuote])
        setName('')
        setEmail('')
        setPhone('')
        setError('')
    }

    const filteredAndSortedQuotes = useMemo(() => {
        let result = [...quotes]

        if (searchTerm.trim()) {
            result = result.filter(q =>
                q.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
        }

        if (sortMode === 'name') {
            result.sort((a, b) => a.name.localeCompare(b.name))
        } else if (sortMode === 'date') {
            result.sort((a, b) => b.createdAt - a.createdAt)
        }

        return result
    }, [quotes, sortMode, searchTerm])

    return (
        <main className="p-4 space-y-4">
            <button className="btn btn-outline mb-4" onClick={() => navigate('/')}>
                ← Tornar a l'inici
            </button>
            <h1 className="text-2xl font-bold">Calculadora de Serveis</h1>

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

            <div className="total text-xl font-semibold">Preu pressupostat: {total} €</div>

            <h2 className="section-title text-lg font-bold">Demanar pressupost</h2>
            <form onSubmit={handleSubmit} className="space-y-2">
                <input
                    className="form-control"
                    type="text"
                    placeholder="Nom"
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
                <input
                    className="form-control"
                    type="text"
                    placeholder="Telèfon"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                />
                <input
                    className="form-control"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                <button className="btn btn-success" type="submit">
                    Sol·licitar pressupost →
                </button>
                {error && <div className="text-red-600">{error}</div>}
            </form>

            {quotes.length > 0 && (
                <>
                    <h2 className="section-title text-lg font-bold mt-6">Pressupostos en curs:</h2>

                    {/* Buscador i botons d'ordenació */}
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-4">
                        {/* Buscador */}
                        <div className="relative w-full md:w-1/3">
                            <input
                                type="text"
                                className="form-control w-full pl-8"
                                placeholder="Cerca per nom"
                                value={searchTerm}
                                onChange={e => setSearchTerm(e.target.value)}
                            />
                            <i className="bi bi-search absolute left-2 top-2.5 text-gray-500"></i>
                        </div>

                        {/* Botons ordenació */}
                        <div className="flex gap-2">
                            <button
                                className="btn btn-outline"
                                onClick={() => setSortMode('name')}
                            >
                                Nom <i className="bi bi-caret-down ml-1"></i>
                            </button>
                            <button
                                className="btn btn-outline"
                                onClick={() => setSortMode('date')}
                            >
                                Data <i className="bi bi-caret-down ml-1"></i>
                            </button>
                            <button
                                className="btn btn-outline"
                                onClick={() => setSortMode('none')}
                            >
                                Reiniciar
                            </button>
                        </div>
                    </div>

                    {/* Llistat */}
                    {filteredAndSortedQuotes.map((q, i) => (
                        <div key={i} className="quote-card p-4 rounded-lg shadow bg-white mb-4">
                            <div className="quote-left mb-2">
                                <div className="font-semibold">{q.name}</div>
                                <div className="text-sm text-gray-600">{q.email}</div>
                                <div className="text-sm text-gray-600">{q.phone}</div>
                            </div>
                            <div className="quote-services mb-2">
                                <div className="font-medium">Serveis contractats:</div>
                                <ul className="list-disc list-inside">
                                    {q.services.map((s, idx) => (
                                        <li key={idx}>{s}</li>
                                    ))}
                                </ul>
                            </div>
                            <div className="quote-total text-right font-bold text-lg">
                                {q.total} €
                            </div>
                        </div>
                    ))}
                </>
            )}
        </main>
    )
}

export default Calculator
