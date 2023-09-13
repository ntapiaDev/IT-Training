export enum UserRole {
  User = 'Utilisateur',
  Admin = 'Administrateur',
  Former = 'Formateur',
  Candidate = 'Candidat',
  null = ''
}

export interface Session {
  role: UserRole,
  token: string,
  cart: number
}
