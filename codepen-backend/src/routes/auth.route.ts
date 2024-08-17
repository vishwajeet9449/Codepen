import { catchAsync } from 'catch-async-express'
import { Router } from 'express'
import authController from '../controllers/auth.controller'
import validator from '../middlewares/validator.middleware'
import userValidator from '../validators/user.validator'

const router = Router()

router.post(
  '/login',
  validator({ body: userValidator.login }),
  catchAsync(authController.login)
)

router.post(
  '/register',
  validator({ body: userValidator.register }),
  catchAsync(authController.register)
)

router.post(
  '/refresh-tokens',
  validator({ body: userValidator.refreshToken }),
  catchAsync(authController.refreshTokens)
)

router.post(
  '/logout',
  validator({ body: userValidator.refreshToken }),
  catchAsync(authController.logout)
)

export default router
