import { Center } from "./Center"
import { Training } from "./Training"
import { Former } from "./User"

export interface TrainingSession {
  id: number,
  type: string,
  formation: Training,
  dateDebut: Date,
  dateFin: Date,
  centre: Center,
  formateur: Former,
  nombreParticipants: number,
  remote: boolean
  [key: string]: any
}
