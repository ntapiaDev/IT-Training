export interface Address {
  id: number,
  numero: string,
  adresse: string,
  ville: City
}

export interface City {
  id: number,
  nom: string,
  code_postal: string,
  lon: number,
  lat: number,
  [key: string]: any
}

