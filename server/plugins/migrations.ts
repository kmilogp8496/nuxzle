import { migrate } from 'drizzle-orm/better-sqlite3/migrator'
import { join } from 'pathe'
import { db } from '~/server/db/db.drizzle'

export default defineNitroPlugin(async () => {
  if (process.dev) {
    const { dbPath } = useRuntimeConfig()
    migrate(db, { migrationsFolder: join(dbPath, './migrations') })
  }
})
