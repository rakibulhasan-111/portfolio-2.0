const config = require('./developer.json')
const siteTitle = `${config.name} | ${config.role}`

export default defineNuxtConfig({
  app: {
    // Fallback base URL if NUXT_APP_BASE_URL isn't set
    baseURL: process.env.NUXT_APP_BASE_URL || '/portfolio-2.0/',
    head: {
      title: siteTitle,
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'description', name: 'description', content: 'A awesome developer portfolio design.' },
        { hid: 'og:title', property: 'og:title', content: siteTitle },
        { hid: 'og:description', property: 'og:description', content: 'A awesome developer portfolio design.' },
        { hid: 'og:image', property: 'og:image', content: 'demo-share.jpg' },
        { hid: 'og:url', property: 'og:url', content: 'https://rakibulhasan-111.github.io/portfolio-2.0/' },
        { name: 'theme-color', content: '#010C15' },
      ],
      link: [
        { rel: 'manifest', href: 'pwa/manifest.json' },
        { rel: 'apple-touch-icon', href: 'pwa/icons/apple-touch-icon.png' },
      ],
    },
  },
  nitro: {
    preset: 'static',
  },
  modules: [
    '@nuxtjs/tailwindcss',
  ],
  components: {
    dirs: ['~/components'],
  },
  tailwindcss: {
    cssPath: '~/assets/tailwind.css',
    configPath: 'tailwind.config',
    exposeConfig: true,
    injectPosition: 0,
    viewer: false,
  },
  runtimeConfig: {
    apiSecret: '123',
    public: {
      apiBase: '/api',
      dev: config,
    },
  },
})
