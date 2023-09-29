import type { Config } from 'drizzle-kit'

export default {
  schema: ['./server/**/*.schema.ts'],
  dbCredentials: {
    url: process.env.NUXT_DB_DIR ?? 'db.sqlite',
  },
  driver: 'better-sqlite',
  breakpoints: true,
  out: './server/db/migrations',

} satisfies Config
