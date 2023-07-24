import jwt from 'jsonwebtoken'
import type { User } from './db/schemas/users.schema'

export type TokenUser = Omit<User, 'password'>

export function generateToken(user: TokenUser) {
  const config = useRuntimeConfig()
  const token = jwt.sign(user, config.jwtSecret)
  return token
}
