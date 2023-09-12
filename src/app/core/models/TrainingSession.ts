export interface TrainingSession {
  id: number,
  type: string,
  formation_id: number,
  dateDebut: Date,
  dateFin: Date,
  centre_id: number,
  formateur_id: number,
  nombreParticipants: number,
  remote: boolean
  [key: string]: any
}
