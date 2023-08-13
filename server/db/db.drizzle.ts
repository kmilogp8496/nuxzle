import type { BetterSQLite3Database } from 'drizzle-orm/better-sqlite3'
import { drizzle } from 'drizzle-orm/better-sqlite3'
import Database from 'better-sqlite3'
import { join } from 'pathe'

const { dbPath } = useRuntimeConfig()
const sqlite = new Database(join(dbPath, './db.sqlite'))
export const db: BetterSQLite3Database = drizzle(sqlite)
