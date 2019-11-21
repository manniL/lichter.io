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
    '~/plugins/composition-api.js',
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

  modules: [
    'nuxt-svg-loader',
    '@nuxtjs/google-analytics',
    '@nuxtjs/pwa',
    '@nuxtjs/axios'
  ],

  buildModules: [
    '@nuxtjs/netlify-files',
    '@nuxtjs/sitemap'
  ].concat(utils.isDev ? [] : ['nuxt-purgecss']),

  css: [
    'assets/styles/app'
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

  netlifyFiles: {
    existingFilesDirectory: './netlify'
  },

  axios: {
    https: !utils.isDev,
    prefix: '/.netlify/functions/',
    proxy: utils.isDev
  },

  proxy: {
    '/.netlify/functions/': {
      target: 'http://localhost:9000'
    }
  },

  purgeCSS: {
    mode: 'postcss',
    whitelistPatterns: [/cookie-consent/]
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

  manifest,
  render,
  build
}
