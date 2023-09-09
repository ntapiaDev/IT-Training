export interface Address {
  id: number,
  number: string;
  street: string;
  zip: string;
  city: City;
  [key: string]: any;
}

interface City {
  id: number,
  name: string,
  long: number,
  lat: number,
  [key: string]: any;
}
