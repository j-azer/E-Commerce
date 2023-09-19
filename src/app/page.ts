import { Produto } from "./produto";

export interface Page {
    content: Array<Produto>,
    totalPages: string,
    totalElements: string,
    last: boolean,
    limit: string,
    number: string,
    sort: any,
    frist: boolean
    
}