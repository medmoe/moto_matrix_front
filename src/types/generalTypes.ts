//types related to table component
export type TableRows<T> = Array<T>;

export interface TableColumnMappingRecord {
    [key: string]: string | TableColumnMappingRecord
}


// Enumerators
export enum ResponseStatusCodes {
    Unauthorized = 401,
    Forbidden = 403,
    BadRequest = 400,
    NotFound = 404
}
