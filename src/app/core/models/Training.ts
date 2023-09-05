export interface Training {
  id: number,
  nom: string,
  reference: string,
  description: string,
  icon: string,
  theme_id: number,
  days: number,
  price: number,
  remote: boolean,
  [key: string]: any;
}
