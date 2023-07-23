import { Type, validateBody } from 'h3-typebox'
import { SqliteError } from 'better-sqlite3'
import type { InsertUser, User } from '~/server/utils/schemas/users.schema'

export default defineEventHandler(async (event) => {
  const body: InsertUser = await validateBody(event, Type.Object({
    email: Type.String({ format: 'email' }),
    password: Type.String({ minLength: 8 }),
  }), { includeAjvFormats: true })

  try {
    const user: User = db.insert(users).values(body).returning().get()
    return user
  }
  catch (error) {
    if (error instanceof SqliteError) {
      switch (error.code) {
        case 'SQLITE_CONSTRAINT_UNIQUE':
          throw createError({
            statusCode: 400,
            statusMessage: 'El correo electrónico ya está registrado',
          })
        default:
          throw createError({
            statusCode: 500,
            statusMessage: 'Ha ocurrido un error al registrar el usuario',
          })
      }
    }
    throw createError({
      statusCode: 500,
    })
  }
})
