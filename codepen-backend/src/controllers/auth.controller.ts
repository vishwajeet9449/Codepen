import { HttpError } from '../helpers/HttpError'
import { Request, Response } from 'express'
import authService from '../services/auth.service'
import {
  RegisterUserPayload,
  LoginPayload,
  ROLE,
  RefreshPayload,
} from '../types'

const login = async (req: Request<{}, {}, LoginPayload>, res: Response) => {
  const { email, password } = req.body
  const { user, isPasswordValid } = await authService.comparePassword(
    email,
    password
  )

  if (!isPasswordValid) {
    throw new HttpError({ message: 'Invalid credentials!', code: 401 })
  }
  const tokens = await authService.generateAuthTokens(user)
  return res.status(200).json({
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
    },
    tokens,
  })
}

const register = async (
  req: Request<{}, {}, RegisterUserPayload>,
  res: Response
) => {
  const { email, password, name } = req.body
  const user = await authService.createUser({
    email,
    password,
    name,
    role: ROLE.USER,
  })
  const tokens = await authService.generateAuthTokens(user)
  return res.status(201).json({
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
    },
    tokens,
  })
}

const refreshTokens = async (
  req: Request<{}, {}, RefreshPayload>,
  res: Response
) => {
  const { refreshToken } = req.body
  const { user, isTokenValid } = await authService.verifyRefreshToken(
    refreshToken
  )
  if (!isTokenValid) {
    throw new HttpError({ message: 'Invalid refresh token!', code: 401 })
  }
  const tokens = await authService.generateAuthTokens(user)

  return res.status(200).json({
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
    },
    tokens,
  })
}

const logout = async (req: Request<{}, {}, RefreshPayload>, res: Response) => {
  const { refreshToken } = req.body
  await authService.removeRefreshToken(refreshToken)
  return res.status(200).json({
    message: 'Logged out successfully!',
  })
}

export default {
  login,
  register,
  refreshTokens,
  logout,
}
