import fs from 'fs'
import path from 'path'
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
    '@nuxtjs/pwa'
  ].concat(utils.isDev ? [] : ['nuxt-purgecss']),

  'google-analytics': {
    id: 'UA-62902757-11',
    disabled: () => document.cookie.indexOf('ga_optout=true') !== -1,
    debug: {
      sendHitTask: !utils.isDev
    },
    set: [
      { field: 'anonymizeIp', value: true }
    ]
  },

  purgeCSS: {
    mode: 'postcss',
    whitelistPatterns: [/cookie-consent/]
  },

  hooks: {
    'generate:distCopied'() {
      fs.copyFileSync(path.resolve(__dirname, './_redirects'), path.resolve(__dirname, './dist/_redirects'))
    }
  },

  manifest,
  render,
  build
}
