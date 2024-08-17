import Joi from 'joi'
import { LoginPayload, RefreshPayload, RegisterUserPayload } from '../types'

const register = Joi.object<RegisterUserPayload>({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  name: Joi.string().required(),
  role  : Joi.number().integer(),
})

const login = Joi.object<LoginPayload>({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
})

const refreshToken = Joi.object<RefreshPayload>({
  refreshToken: Joi.string().required(),
})

export default {
  register,
  login,
  refreshToken,
}
