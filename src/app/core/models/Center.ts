import { Address } from "./Address";

export interface Center {
  id: number,
  nom: string,
  adresse: Address,
  [key: string]: any
}
