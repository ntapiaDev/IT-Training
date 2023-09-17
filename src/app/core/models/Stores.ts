import { Address, City } from "./Address";
import { Center } from "./Center";
import { Former } from "./User";

export interface AdminStore {
    address: Address[],
    centers: Center[],
    cities: City[],
    formers: Former[],
}
