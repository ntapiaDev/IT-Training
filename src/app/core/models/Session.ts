export enum UserRole {
  ROLE_USER = 'Utilisateur',
  ROLE_ADMIN = 'Administrateur',
  null = ''
}

export interface Session {
  role: string,
  email: string,
  token: string,
  cart: number
}
