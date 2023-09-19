export interface Utilizador{
    id?: number,
    nome: string,
    email: string,
    senha: string,
    morada: string,
    codigo_postal: string,
    pais: string,
    activo: boolean,
    admin: boolean
}