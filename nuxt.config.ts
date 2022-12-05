
const SITE_URL = process.env.SITE_URL || 'https://www.lichter.io'

export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      siteUrl: SITE_URL,
      analyticsId: 'UA-62902757-11'
    },
    stripeSecretKey: 'sk_test_dBicKVv5s1znvk1y0GE9dnTr'
  },

  modules: [
    '@kevinmarrec/nuxt-pwa',
    '@nuxtjs/tailwindcss',
    '@vueuse/nuxt',
    'nuxt-icon',
  ],
  // TODO
  // 'google-analytics': {
  //   disabled: () => document.cookie.includes('ga_optout=true'),
  // },

  pwa: {
    manifest: {
      name: 'Lichter.io',
      lang: 'en',
      short_name: 'Lichter.io',
      start_url: '/?ref=pwa',
      display: 'standalone',
    },
    icon: {
      source: './public/img/me@2x.jpg'
    },
    meta: {
      name: 'Lichter.io - Alexander Lichter',
      author: 'Alexander Lichter',
      mobileAppIOS: true,
      ogHost: SITE_URL,
      twitterCard: 'summary',
      twitterCreator: '@TheAlexLichter',
      twitterSite: '@TheAlexLichter'
    }
  }
})