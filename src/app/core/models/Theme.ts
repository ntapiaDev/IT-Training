import { Area } from "./Area";

export interface Theme {
    id: number,
    nom: string,
    description: string,
    domaine: Area,
    [key: string]: any;
  }
  