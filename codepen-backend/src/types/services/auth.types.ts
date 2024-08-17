import { IUser } from '../user.types'

export interface Token {
  token: string
  expires: Date
}

export interface Tokens {
  access: Token
  refresh: Token
}

export type RegisterUserPayload = Pick<IUser, 'email' | 'password' | 'name' | 'role'>

export type LoginPayload = Pick<IUser, 'email' | 'password'>

export interface RefreshPayload {
  refreshToken: string
}
