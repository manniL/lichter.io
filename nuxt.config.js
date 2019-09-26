import { build, head, manifest, meta, render, utils } from './config'
import { baseUrl } from '@/config/utils'

export default {
  modern: !utils.isDev,
  // Watch config subfiles
  watch: ['~/config/*'],
  head,
  meta,

  router: {
    trailingSlash: true
  },

  env: {
    baseUrl: utils.baseUrl
  },

  css: [
    'assets/styles/app'
  ],

  plugins: [
    { src: '~/plugins/vue-scroll-reveal', ssr: false }
  ],

  generate: {
    fallback: true
  },

  buildModules: [
    '@nuxtjs/netlify-files',
    '@nuxtjs/sitemap'
  ],

  modules: [
    '@nuxtjs/google-analytics',
    '@nuxtjs/pwa'
  ].concat(utils.isDev ? [] : ['nuxt-purgecss']),

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

  purgeCSS: {
    mode: 'postcss',
    whitelistPatterns: [/cookie-consent/]
  },

  sitemap: {
    hostname: baseUrl,
    trailingSlash: true,
    exclude: [
      '/privacy/',
      '/legal/'
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
