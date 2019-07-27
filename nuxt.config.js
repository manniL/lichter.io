import { build, head, manifest, meta, render, utils } from './config'

export default {
  modern: !utils.isDev,
  // Watch config subfiles
  watch: ['~/config/*'],
  head,
  meta,

  css: [
    'assets/styles/app'
  ],

  plugins: [
    { src: '~/plugins/vue-scroll-reveal', ssr: false }
  ],

  generate: {
    fallback: true
  },

  modules: [
    '@nuxtjs/google-analytics',
    '@nuxtjs/pwa',
    '@nuxtjs/netlify-files'
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

  manifest,
  render,
  build
}
