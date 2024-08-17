import { RequestHandler } from 'express'
import User from '../models/user.model'
import { HttpError } from '../helpers/HttpError'
import jwt from 'jsonwebtoken'
import { AccessToken } from '../types/token.types'
import { ScopeList } from '../types/scopes.types'

interface TokenVerificationOptions {
  strict: boolean
}

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string
        name: string
        scopes: ScopeList[]
      }
      strictTokenCheck?: boolean
    }
  }
}

export const verifyToken = (
  options: TokenVerificationOptions = {
    strict: true,
  }
): RequestHandler => {
  return async (req, res, next) => {
    try {
      req.strictTokenCheck = options.strict
      const token = req.headers.authorization?.replace('Bearer', '').trim()
      if (!token) {
        if (!options.strict) {
          return next()
        }
        throw new HttpError({
          code: 401,
          message: 'Unauthorized',
        })
      }
      const { id } = jwt.verify(
        token,
        process.env.JWT_ACCESS_TOKEN_SECRET!
      ) as AccessToken
      const user = await User.findOne({ _id: id })
      if (!user) {
        throw new HttpError({
          code: 401,
          message: 'Unauthorized',
        })
      }
      req.user = {
        id: user._id.toString(),
        name: user.name,
        scopes: user.role.scopes,
      }
      return next()
    } catch (err) {
      return res.status(401).json({
        code: 401,
        message: 'Unauthorized',
      })
    }
  }
}
