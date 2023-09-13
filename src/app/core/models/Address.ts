export interface Address {
  id: number,
  numero: string,
  adresse: string,
  ville: City
}

export interface City {
  id: number,
  nom: string,
  codePostal: string,
  lon: number,
  lat: number,
  [key: string]: any
}

