import { Schema, model } from 'mongoose'
import { IToken } from '../types/token.types'

const TokenSchema = new Schema<IToken>({
  token: {
    type: String,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  expires: {
    type: Date,
    required: true,
    expires: `${process.env.JWT_REFRESH_TOKEN_EXPIRES_IN}m`,
  },
  blacklisted: {
    type: Boolean,
    required: false,
    default: false,
  },
})

export default model<IToken>('Token', TokenSchema, 'tokens')
