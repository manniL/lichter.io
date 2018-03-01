const tailwindConfig = require('./tailwind.js')
const path = require('path')
const glob = require('glob-all')
const PurgeCssPlugin = require('purgecss-webpack-plugin')
module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'Lichter.io - Alexander Lichter',
    meta: [
      {
        'http-equiv': 'x-ua-compatible', content: 'ie=edge'
      },
      {
        name: 'apple-mobile-web-app-capable',
        content: true
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1, shrink-to-fit=no'
      },
      {
        name: 'author',
        content: 'Alexander Lichter'
      },
      {
        hid: 'og:title',
        property: 'og:title',
        content: 'Lichter.io - Alexander Lichter'
      },
      {
        hid: 'og:url',
        property: 'og:url',
        content: 'https://lichter.io'
      },
      {
        hid: 'og:image',
        property: 'og:image',
        content: 'https://lichter.io/icon.png'
      },
      {
        name: 'twitter:card',
        content: 'summary'
      },
      {
        name: 'twitter:creator',
        content: '@TheAlexLichter'
      }
    ]
  },
  /*
  ** CSS Load
   */
  css: [
    // SCSS file in the project
    '@/assets/styles/app.scss'
  ],
  /*
  ** Nuxt plugins
   */
  plugins: [
    {src: '~/plugins/vue-smooth-scroll', ssr: false},
    {src: '~/plugins/vue-scroll-reveal', ssr: false}
  ],
  /*
  ** Modules
   */
  modules: [
    // Simple usage
    ['@nuxtjs/google-analytics', {
      id: 'UA-62902757-11'
    }],
    '@nuxtjs/pwa'
  ],
  /*
  ** Customize the progress bar color
  */
  loading: {color: tailwindConfig.colors.red},
  loadingIndicator: {
    name: 'rectangle-bounce',
    color: 'white',
    background: tailwindConfig.colors.red
  },
  /*
  ** Manifest
   */
  manifest: {
    name: 'Lichter.io',
    lang: 'en',
    short_name: 'Lichter.io',
    start_url: '/',
    display: 'standalone',
    background_color: tailwindConfig.colors['grey-lighter'],
    theme_color: tailwindConfig.colors.red
  },
  /*
  ** Build configuration
  */
  build: {
    vendor: ['vue-smooth-scroll', 'vue-scroll-reveal'],
    extractCSS: {
      allChunks: true
    },
    postcss: [
      require('tailwindcss')('./tailwind.js'),
      require('autoprefixer')
    ],
    /*
    ** Run ESLint on save
    ** Add PurgeCSS
    */
    extend (config, ctx) {
      if (ctx.isClient) {
        if (ctx.isDev) {
          config.module.rules.push({
            enforce: 'pre',
            test: /\.(js|vue)$/,
            loader: 'eslint-loader',
            exclude: /(node_modules)/
          })
        } else {
          config.plugins.push(new PurgeCssPlugin({
            paths: glob.sync([
              path.join(__dirname, 'components/**/*.vue'),
              path.join(__dirname, 'layouts/**/*.vue'),
              path.join(__dirname, 'pages/**/*.vue'),
              path.join(__dirname, 'plugins/**/*.vue')
            ]),
            styleExtensions: ['.css'],
            whitelist: ['body', 'html', 'nuxt-progress'],
            extractors: [
              {
                extractor: class {
                  static extract (content) {
                    return content.match(/[A-z0-9-:\\/]+/g)
                  }
                },
                extensions: ['vue']
              }
            ]
          }))
        }
      }
    }
  }
}
