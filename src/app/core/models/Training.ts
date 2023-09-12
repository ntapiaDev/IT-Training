export interface Training {
  id: number,
  nom: string,
  description: string,
  duree: number,
  prix: number,
  prerequis: boolean,
  theme_id: number,
  [key: string]: any
}
