export interface Service {
    id: string
    name: string
    price: number
    selected: boolean
}

export interface WebConfig {
    pages: number
    languages: number
}

export interface Budget {
    name: string
    date: string
    total: number
}
