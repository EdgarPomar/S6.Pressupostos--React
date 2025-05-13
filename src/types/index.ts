export interface Service {
    id: string
    name: string
    selected: boolean
    price: number
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
