export interface Training {
  id: number,
  name: string,
  reference: string,
  description: string,
  icon: string,
  theme_id: number,
  days: number,
  price: number,
  remote: boolean,
  [key: string]: any;
}
