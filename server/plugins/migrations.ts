import { migrate } from 'drizzle-orm/better-sqlite3/migrator'
import { join } from 'pathe'
import { useDb } from '~/server/db/db.drizzle'

export default defineNitroPlugin(async () => {
  if (process.dev) {
    const { dbPath } = useRuntimeConfig()
    migrate(useDb, { migrationsFolder: join(dbPath, './migrations') })
  }
})
