import { createResolver } from 'nuxt/kit'

const { resolve } = createResolver(import.meta.url)

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  runtimeConfig: {
    jwtSecret: '',
    authCookieName: '',
    dbDir: resolve(process.env.NUXT_DB_DIR ?? 'server/db'),
  },

  vite: {
    vue: {
      script: {
        defineModel: true,
        propsDestructure: true,
      },
    },
  },

  experimental: {
    typedPages: true,
  },

  modules: [
    '@nuxt/ui',
    '@pinia/nuxt',
    '@nuxtjs/eslint-module',
    'nuxt-auth-utils',
  ],

  eslint: {
    lintOnStart: false,
  },

  imports: {
    dirs: [
      'api',
      'stores',
    ],
    presets: [
      {
        from: 'zod',
        imports: ['z'],
      },
    ],
  },
})
