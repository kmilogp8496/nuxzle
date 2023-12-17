import jwt from 'jsonwebtoken'
import type { SessionUser } from '../utils/utils.interface'
import type { TokenUser } from '~/server/utils/jwt'

export default defineEventHandler(async (event) => {
  const req = event.node.req
  const user = (await getUserSession(event)).user as SessionUser | undefined

  console.info(`${req.method} ${req.url} ${user?.email ?? 'anonymous'}`)
})
