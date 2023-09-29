import type { BetterSQLite3Database } from 'drizzle-orm/better-sqlite3'
import { drizzle } from 'drizzle-orm/better-sqlite3'
import Database from 'better-sqlite3'
import type { DrizzleD1Database } from 'drizzle-orm/d1'
import { drizzle as drizzleD1 } from 'drizzle-orm/d1'
import { join } from 'pathe'
import type { LibSQLDatabase } from 'drizzle-orm/libsql'
import { drizzle as drizzleLibSQL } from 'drizzle-orm/libsql'
import { createClient as createLibSQLClient } from '@libsql/client/http'

let _db: DrizzleD1Database | BetterSQLite3Database | LibSQLDatabase | null = null

export function useDb() {
  if (!_db) {
    if (process.env.TURSO_DB_URL && process.env.TURSO_DB_TOKEN) {
      // Turso in production
      _db = drizzleLibSQL(createLibSQLClient({
        url: process.env.TURSO_DB_URL,
        authToken: process.env.TURSO_DB_TOKEN,
      }))
    }
    else if (process.env.DB) {
      // d1 in production
      _db = drizzleD1(process.env.DB)
    }
    else if (process.dev) {
      // local sqlite in development
      const { dbDir } = useRuntimeConfig()
      const sqlite = new Database(join(dbDir, './db.sqlite'))
      _db = drizzle(sqlite)
    }
    else {
      throw new Error('No database configured for production')
    }
  }
  return _db as BetterSQLite3Database
}
