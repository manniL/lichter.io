import { colors } from './tailwind.js'
import helmet from 'helmet'
import { build, head, manifest, meta, render } from './config'

export default {

  // Watch config subfiles
  watch: ['~/config/*'],
  head,
  meta,

  css: [
    '@/assets/styles/app.scss'
  ],

  plugins: [
    { src: '~/plugins/vue-scroll-reveal', ssr: false }
  ],

  /*
   * Modules
   */

  modules: [
    ['@nuxtjs/google-analytics', {
      id: 'UA-62902757-11',
      disabled: () => document.cookie.indexOf('ga_optout=true') !== -1,
      debug: {
        sendHitTask: process.env.NODE_ENV === 'production'
      },
      set: [
        { field: 'anonymizeIp', value: true }
      ]
    }],
    '@nuxtjs/pwa'
  ],

  /*
   * Customize the progress bar color
   */
  loading: { color: colors.red },
  loadingIndicator: {
    name: 'rectangle-bounce',
    color: 'white',
    background: colors.red
  },

  manifest,
  render,
  serverMiddleware: [
    helmet({
      referrerPolicy: { policy: 'strict-origin-when-cross-origin' }
    })
  ],

  build
}
