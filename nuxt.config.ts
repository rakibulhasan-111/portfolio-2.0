import { readFileSync } from 'fs'

// Define the shape of your config
interface DeveloperConfig {
  name: string
  role: string
  contacts: {
    social: {
      github: { user: string }
      twitter: { user: string }
    }
    email: string
  }
}

// Load your developer info safely
let config: DeveloperConfig = {
  name: 'Developer Name',
  role: 'Your Role',
  contacts: {
    social: {
      github: { user: '' },
      twitter: { user: '' },
    },
    email: 'email@example.com',
  },
}

try {
  const loadedConfig = require('./developer.json')
  // Merge loaded config with defaults
  config = {
    ...config,
    ...loadedConfig,
    contacts: {
      social: {
        github: { user: loadedConfig.contacts?.social?.github?.user || config.contacts.social.github.user },
        twitter: { user: loadedConfig.contacts?.social?.twitter?.user || config.contacts.social.twitter.user },
      },
      email: loadedConfig.contacts?.email || config.contacts.email,
    },
  }
} catch (err) {
  console.warn('developer.json not found or invalid. Using default values.')
}

const siteTitle = `${config.name} | ${config.role}`

export default defineNuxtConfig({
  app: {
    baseURL: process.env.NUXT_APP_BASE_URL || '/portfolio-2.0/',
    head: {
      title: siteTitle,
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'description', name: 'description', content: 'An awesome developer portfolio design.' },
        { hid: 'og:title', property: 'og:title', content: siteTitle },
        { hid: 'og:description', property: 'og:description', content: 'An awesome developer portfolio design.' },
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
  modules: ['@nuxtjs/tailwindcss'],
  components: { dirs: ['~/components'] },
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
      dev: {
        name: config.name,
        role: config.role,
        contacts: config.contacts,
      },
    },
  },
})
