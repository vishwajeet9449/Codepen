import { ObjectId } from 'mongoose'
import { ScopeList } from './scopes.types'

export enum ROLE {
  USER = 1,
}

export interface Role {
  id: number
  label: string
  scopes: ScopeList[]
}

export interface IUser {
  _id: ObjectId
  id: string
  name: string
  password: string
  email: string
  role: Role
}
