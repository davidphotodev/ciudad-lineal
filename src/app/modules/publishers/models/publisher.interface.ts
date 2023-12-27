export interface Publisher {
    firstname: string,
    lastname: string,
    publisherType: string,
    email: string,
    phone: string,
    whatsapp: string,
    description: string,
    territories: Territory[],
    history: History[]
}

export interface Territory {
    number: number
}

export interface History{
    territoryNumber: number,
    date_init: string,
    date_end: string
}