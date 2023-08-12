// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  runtimeConfig: {
    jwtSecret: '',
    authCookieName: '',
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
    '@nuxthq/ui',
    '@pinia/nuxt',
    // '@nuxtjs/eslint-module',
  ],

  eslint: {
    lintOnStart: false,
  },

  imports: {
    dirs: [
      'api',
      'stores',
    ],
  },

  pinia: {
    autoImports: [
      'defineStore',
    ],
  },
})
