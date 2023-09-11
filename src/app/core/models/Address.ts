export interface Address {
  id: number,
  numero: string,
  adresse: string,
  ville_id: number,
  [key: string]: any
}

export interface City {
  id: number,
  nom: string,
  code_postal: string,
  long: number,
  lat: number,
  [key: string]: any
}

export interface FullAddress {
  numero: string,
  adresse: string,
  ville: {
    nom: string,
    code_postal: string,
    long: number,
    lat: number
  }
}
