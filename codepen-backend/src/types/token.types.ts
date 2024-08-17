import { PopulatedDoc } from 'mongoose'
import { IUser } from './user.types'
import { JwtPayload } from 'jsonwebtoken'

export interface IToken {
  token: string
  user: PopulatedDoc<IUser>
  expires: Date
  blacklisted: boolean
}

export interface AccessToken extends JwtPayload {
  id: string
}

export interface RefreshToken extends JwtPayload {
  id: string
}
