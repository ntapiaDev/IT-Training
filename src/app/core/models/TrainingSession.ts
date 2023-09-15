import { Center } from "./Center"
import { Training } from "./Training"
import { Former } from "./User"

export interface TrainingSession {
  id: number,
  type: string,
  formation: Training,
  dateDebut: Date,
  duree: number,
  dateFin: Date,
  centre: Center,
  formateur: Former,
  nombreParticipants: number,
  remote: boolean,
  prix: number
  [key: string]: any
}
