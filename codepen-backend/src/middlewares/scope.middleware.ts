import { NextFunction, Request, RequestHandler, Response } from 'express'
import { HttpError } from '../helpers/HttpError'
import { ScopeList } from '../types/scopes.types'

export const scopeChecker = (scopes: ScopeList[]): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction) => {
    /**
     * only pass when strictTokenCheck is false and user is not found
     * check if user is found but strictness is loose
     */
    if (!req.strictTokenCheck && !req.user) {
      return next()
    }

    const { user } = req
    if (!user) {
      throw new Error(
        'User not found! Make sure you use verifyToken middleware before this middleware.'
      )
    }
    if (!scopes.some((scope) => user.scopes.includes(scope))) {
      throw new HttpError({
        code: 403,
        message: 'Forbidden',
      })
    }
    next()
  }
}
