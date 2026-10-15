export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/eslint'],
  css: ['~/assets/styles/main.less'],
  runtimeConfig: {
    alias: '',
    apiBase: 'https://naukatv.ru/api/test/materials'
  }
})
