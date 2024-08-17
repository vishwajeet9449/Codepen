import { Schema, model } from 'mongoose'
import { IUser } from '../types'
import { getRole } from '../helpers/role.helper'

const UserSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    role: {
      type: Number,
      required: true,
      get: getRole,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
    id: true,
    toJSON: {
      virtuals: true,
      getters: true,
    },
    toObject: {
      virtuals: true,
      getters: true,
    },
  }
)

export default model<IUser>('User', UserSchema, 'users')
