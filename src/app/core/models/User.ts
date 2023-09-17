import { Address } from "./Address"
import { Center } from "./Center"
import { UserRole } from "./Session"
import { TrainingSession } from "./TrainingSession"

export interface AppUser {
    id?: number,
    username: string,
    password?: string,
    role?: UserRole[]
}

export interface User extends AppUser {
    nom: string,
    prenom: string,
    telephone: string,
    securiteSociale: string,
    adresse: Address,
    identifiantPoleEmploi?: string,
    session?: TrainingSession,
    validate?: boolean
}

export interface Former extends User {
    siret: string,
    centres?: Center[]
}
