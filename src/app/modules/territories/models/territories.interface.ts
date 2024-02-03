export interface Territory{
    id?: string,
    number: number,
    description: string,
    history: TerritoryHistory[],
    type: string,
    map: string,
    publisher: string,
    publisher_id?: string,
    state: string,
    last_date: string
}

export interface TerritoryHistory{
    publisher: string,
    date_init: string,
    date_end: string
}