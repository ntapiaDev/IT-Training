import { Address } from "./Address"
import { Center } from "./Center"
import { UserRole } from "./Session"

export interface AppUser {
    id: number,
    username: string,
    password: string,
    role?: UserRole[]
}

export interface User extends AppUser {
    nom: string,
    prenom: string,
    telephone: string,
    securiteSociale: string,
    adresse: Address
}

export interface Former extends User {
    siret: string,
    centres?: Center[]
}
