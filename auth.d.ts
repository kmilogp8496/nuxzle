import type { User } from './server/db/schemas/users.schema'
import type { SessionUser } from './server/utils/utils.interface'

declare module '#auth-utils' {
  interface UserSession {
    user: SessionUser
    loggedInAt: string
  }
}

export {}
