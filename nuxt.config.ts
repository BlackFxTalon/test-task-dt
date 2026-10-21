const fonts = ['futura-pt-book', 'futura-pt-medium', 'source-sans-3-semibold'];

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/eslint'],
  app: {
    head: {
      htmlAttrs: { lang: 'ru' },
      titleTemplate: '%s | Моя планета',
      link: fonts.map((font) => ({
        rel: 'preload',
        as: 'font',
        type: 'font/woff2',
        href: `/fonts/${font}.woff2`,
        crossorigin: 'anonymous'
      }))
    }
  },
  css: ['~/assets/styles/main.less'],
  runtimeConfig: {
    alias: '',
    apiBase: 'https://naukatv.ru/api/test/materials'
  },
  vite: { 
    css: 
    { 
      preprocessorOptions: 
      { 
        less: 
        { 
          additionalData: `@import "~/assets/styles/breakpoints.less";` 
        } 
      } 
    } 
  }
});
