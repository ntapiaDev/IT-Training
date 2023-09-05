export enum UserRole {
  User = 'user',
  Admin = 'admin',
  null = ''
}

export interface Session {
  role: UserRole,
  token: string,
  cart: number
}
