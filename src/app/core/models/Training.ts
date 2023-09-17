import { Theme } from "./Theme";

export interface Training {
  id: number,
  nom: string,
  description: string,
  duree: number,
  prix: number,
  prerequis: boolean,
  theme: Theme,
  [key: string]: any
}
