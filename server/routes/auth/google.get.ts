import { eq } from 'drizzle-orm'
import { useDb } from '~/server/db/db.drizzle'
import type { InsertUser } from '~/server/db/schemas/users.schema'
import { users } from '~/server/db/schemas/users.schema'

export interface GoogleUserSession {
  sub: string
  name: string
  given_name: string
  family_name: string
  picture: string
  email: string
  email_verified: boolean
  locale: 'es' | 'en' & string
}

export interface GoogleTokens {
  access_token: string
  expires_in: number
  scope: string
  token_type: string
  id_token: string
}

export default oauth.googleEventHandler({
  config: {
    redirectUrl: '/auth/google',
  },
  // @ts-expect-error - The types from the package are wrong
  async onSuccess(event, { user }: { user: GoogleUserSession; tokens: GoogleTokens }) {
    const db = useDb()
    let dbUser = db.select().from(users).where(eq(users.email, user?.email)).get()

    if (!dbUser) {
      const newUser: InsertUser = {
        email: user.email,
        socialLogin: 1,
        password: '',
        name: user.name,
      }

      dbUser = db.insert(users).values(newUser).returning().get()
    }

    const { password: _password, ...userWithoutPassword } = dbUser

    await setUserSession(event, {
      user: userWithoutPassword,
      loggedInAt: new Date().toISOString(),
    })
    return sendRedirect(event, '/')
  },
  // Optional, will return a json error and 401 status code by default
  onError(event, error) {
    console.error('Google OAuth error:', error)
    return sendRedirect(event, '/')
  },
})
