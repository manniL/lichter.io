export default defineNuxtConfig({
  routeRules: {
    '/support-me/': { redirect: { to: '/sponsors/', statusCode: 301 } },
    '/timeline/': { redirect: { to: '/about/', statusCode: 301 } },
    '/slides/**': { redirect: { to: 'https://slides.com/mannil/**', statusCode: 302 } },
    '/nuxt-dynamic-ssr-spa/': { redirect: { to: '/nuxt3-dynamic-ssr-spa/', statusCode: 301 } }
  },

  runtimeConfig: {
    public: {
      site: {
        url: 'https://www.lichter.io',
      }
    }
  },

  modules: [
    '@nuxtjs/tailwindcss',
    '@vueuse/nuxt',
    '@nuxt/icon',
    '@nuxt/content',
    '@nuxtjs/seo',
    '@nuxt/image',
    '@nuxtjs/plausible',
  ],

  nitro: {
    prerender: {
      routes: [
        '/feed.xml',
      ],
    },
    devProxy: {
      '/api/newsletter': { target: 'https://lichter-io-newsletter.netlify.app', changeOrigin: true }
    }
  },

  site: {
    url: 'https://www.lichter.io',
    name: 'Alexander Lichter',
    trailingSlash: true,
  },

  ogImage: {
    compatibility: {
      dev: { sharp: false },
    },
  },

  plausible: {
    domain: 'lichter.io',
    apiHost: 'https://plausible.lichter.io',
  },

  content: {
    documentDriven: true,
    highlight: {
      theme: 'vitesse-dark'
    },
    markdown: {
      remarkPlugins: ['remark-reading-time'],
      rehypePlugins: {
        'rehype-external-links': false
      }
    },
  },

  devtools: {
    enabled: true
  },

  experimental: {
    inlineRouteRules: true,
    defaults: {
      useAsyncData: {
        deep: false,
      }
    },
    headNext: true,
    sharedPrerenderData: true,
  },
  compatibilityDate: '2024-12-14'
})