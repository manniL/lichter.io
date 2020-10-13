// eslint-disable-next-line import/named
import { build, head, manifest, meta, render, utils } from './config'

export default {
  modern: !utils.isDev && 'client',
  // Watch config subfiles
  watch: ['~/config/*'],
  head,
  meta,

  router: {
    trailingSlash: true
  },

  env: {
    baseUrl: utils.baseUrl,
    stripePublicKey: utils.isDev ? 'pk_test_9hUFtiNMcseCbvLBySY7D8P6' : (process.env.STRIPE_PUBLIC_KEY || '')
  },

  plugins: [
    '~/plugins/vue-scroll-reveal.client',
    '~/plugins/polyfills.client'
  ],

  generate: {
    fallback: true
  },

  fetch: {
    client: false,
    server: false
  },
  features: {
    store: false,
    middleware: false,
    deprecations: false,
    validate: false,
    asyncData: false,
    fetch: false,
    componentAliases: false
  },

  buildModules: [
    '@nuxtjs/netlify-files',
    'nuxt-svg-loader',
    '@nuxtjs/google-analytics',
    '@nuxtjs/pwa',
    '@nuxt/http',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/composition-api',
    '@nuxtjs/sitemap'
  ],

  'google-analytics': {
    id: 'UA-62902757-11',
    disabled: () => document.cookie.includes('ga_optout=true'),
    debug: {
      sendHitTask: !utils.isDev
    },
    set: [
      { field: 'anonymizeIp', value: true }
    ]
  },

  tailwindcss: {
    configPath: '~/config/tailwind.config.js',
    cssPath: '~/assets/styles/app.pcss'
  },

  netlifyFiles: {
    existingFilesDirectory: './netlify'
  },

  http: {
    https: !utils.isDev,
    prefix: '/.netlify/functions/',
    proxy: utils.isDev
  },

  proxy: {
    '/.netlify/functions/': {
      target: 'http://localhost:9000'
    }
  },

  sitemap: {
    hostname: utils.baseUrl,
    trailingSlash: true,
    exclude: [
      '/privacy',
      '/legal'
    ],
    defaults: {
      changefreq: 'daily',
      priority: 1,
      lastmodrealtime: true
    }
  },

  pwa: {
    icon: {
      source: 'static/img/me@2x.jpg'
    }
  },

  manifest,
  render,
  build
}
