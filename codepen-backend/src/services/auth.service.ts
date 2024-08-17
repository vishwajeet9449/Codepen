import { IUser, ROLE, Tokens } from '../types'
import jwt from 'jsonwebtoken'
import Token from '../models/token.model'
import User from '../models/user.model'
import bcryptjs from 'bcryptjs'
import { HttpError } from '../helpers/HttpError'
import { RefreshToken } from '../types/token.types'

const saveToken = async (userId: string, refreshToken: string) => {
  const token = await Token.findOneAndUpdate(
    {
      user: userId,
    },
    {
      token: refreshToken,
      expires: new Date(
        Date.now() + parseInt(process.env.JWT_REFRESH_TOKEN_EXPIRES_IN!) * 60000
      ),
    },
    {
      new: true,
      upsert: true,
    }
  )

  return token
}

const generateAuthTokens = async (user: IUser): Promise<Tokens> => {
  console.log(user)
  const accessToken = jwt.sign(
    {
      id: user.id,
    },
    process.env.JWT_ACCESS_TOKEN_SECRET!,
    {
      expiresIn: `${process.env.JWT_ACCESS_TOKEN_EXPIRES_IN}m`,
    }
  )

  const refreshToken = jwt.sign(
    {
      id: user.id,
    },
    process.env.JWT_REFRESH_TOKEN_SECRET!,
    {
      expiresIn: `${process.env.JWT_REFRESH_TOKEN_EXPIRES_IN}m`,
    }
  )

  await saveToken(user.id, refreshToken)

  return {
    access: {
      token: accessToken,
      expires: new Date(
        Date.now() + parseInt(process.env.JWT_ACCESS_TOKEN_EXPIRES_IN!) * 60000
      ),
    },
    refresh: {
      token: refreshToken,
      expires: new Date(
        Date.now() + parseInt(process.env.JWT_REFRESH_TOKEN_EXPIRES_IN!) * 60000
      ),
    },
  }
}

const comparePassword = async (email: string, password: string) => {
  const user = await User.findOne({ email }).select('+password')
  if (!user) {
    throw new HttpError({ message: 'Invalid credentials!', code: 401 })
  }
  const isPasswordValid = await bcryptjs.compare(password, user.password)
  return { user, isPasswordValid }
}

const createUser = async (
  payload: Pick<IUser, 'email' | 'name' | 'password'> & { role: ROLE }
) => {
  const existingUser = await User.findOne({ email: payload.email })
  if (existingUser) {
    throw new HttpError({ message: 'User already exists!', code: 409 })
  }

  const user = await User.create({
    ...payload,
    password: bcryptjs.hashSync(payload.password),
  })
  return user
}

const verifyRefreshToken = async (
  refreshToken: string
): Promise<
  { isTokenValid: true; user: IUser } | { isTokenValid: false; user: null }
> => {
  const token = await Token.findOne({ token: refreshToken })

  if (!token) {
    return { user: null, isTokenValid: false }
  }

  const { id } = jwt.verify(
    refreshToken,
    process.env.JWT_REFRESH_TOKEN_SECRET!
  ) as RefreshToken

  const user = await User.findOne({ _id: id })

  return { user: user!, isTokenValid: true }
}

const removeRefreshToken = async (refreshToken: string) => {
  await Token.deleteOne({ token: refreshToken })
}

export default {
  generateAuthTokens,
  comparePassword,
  createUser,
  verifyRefreshToken,
  removeRefreshToken,
}
