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
    '@nuxtjs/eslint-module',
  ],

  eslint: {
    lintOnStart: false,
  },

  plugins: ['~/plugins/auth.ts'],
})
