const webpack = require('webpack')

module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'Lichter.io - Alexander Lichter',
    meta: [
      {
        charset: 'utf-8'
      },
      {
        'http-equiv': 'x-ua-compatible', content: 'ie=edge'
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
        hid: 'description',
        name: 'description',
        content: 'The personal website and online CV of Alexander Lichter, an impassioned developer'
      },
      {
        hid: 'description',
        name: 'description',
        content: 'The personal website and online CV of Alexander Lichter, an impassioned developer'
      },
      {
        hid: 'og:title',
        property: 'og:title',
        content: 'Lichter.io - Alexander Lichter'
      },
      {
        hid: 'og:description',
        property: 'og:description',
        content: 'The personal website and online CV of Alexander Lichter, an impassioned developer'
      },
      {
        property: 'og:type',
        content: 'website'
      },
      {
        hid: 'og:url',
        property: 'og:url',
        content: 'https://lichter.io'
      },
      {
        hid: 'og:image',
        property: 'og:image',
        content: 'https://lichter.io/favicon-128.png'
      },
      {name: 'application-name', content: 'Lichter.io'},
      {name: 'msapplication-TileColor', content: '#FFFFFF'},
      {name: 'msapplication-TileImage', content: '/mstile-144x144.png'},
      {name: 'msapplication-square70x70logo', content: '/mstile-70x70.png'},
      {name: 'msapplication-square150x150logo', content: '/mstile-150x150.png'},
      {name: 'msapplication-wide310x150logo', content: '/mstile-310x150.png'},
      {name: 'msapplication-square310x310logo', content: '/mstile-310x310.png'}

    ],
    link: [
      {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'},
      {rel: 'apple-touch-icon-precomposed', href: '/apple-touch-icon-57x57.png', sizes: '57x57'},
      {rel: 'apple-touch-icon-precomposed', href: '/apple-touch-icon-114x114.png', sizes: '114x114'},
      {rel: 'apple-touch-icon-precomposed', href: '/apple-touch-icon-72x72.png', sizes: '72x72'},
      {rel: 'apple-touch-icon-precomposed', href: '/apple-touch-icon-144x144.png', sizes: '144x144'},
      {rel: 'apple-touch-icon-precomposed', href: '/apple-touch-icon-60x60.png', sizes: '60x60'},
      {rel: 'apple-touch-icon-precomposed', href: '/apple-touch-icon-120x120.png', sizes: '120x120'},
      {rel: 'apple-touch-icon-precomposed', href: '/apple-touch-icon-76x76.png', sizes: '76x76'},
      {rel: 'apple-touch-icon-precomposed', href: '/apple-touch-icon-152x152.png', sizes: '152x152'},
      {rel: 'icon', type: 'image/png', href: '/favicon-196x196.png', sizes: '196x196'},
      {rel: 'icon', type: 'image/png', href: '/favicon-96x96.png', sizes: '96x96'},
      {rel: 'icon', type: 'image/png', href: '/favicon-32x32.png', sizes: '32x32'},
      {rel: 'icon', type: 'image/png', href: '/favicon-16x16.png', sizes: '16x16'},
      {rel: 'icon', type: 'image/png', href: '/favicon-128.png', sizes: '128x128'}

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
    }]
  ],
  /*
  ** Customize the progress bar color
  */
  loading: {color: '#3B8070'},
  /*
  ** Build configuration
  */
  build: {
    vendor: ['vue-smooth-scroll', 'vue-scroll-reveal'],
    plugins: [
      new webpack.DefinePlugin({
        VERSION: JSON.stringify(require('./package.json').version)
      })
    ],
    postcss: [
      // to edit target browsers: use "browserslist" field in package.json
      require('tailwindcss')('./tailwind.js'),
      require('autoprefixer')
    ],
    /*
    ** Run ESLint on save
    */
    extend (config, ctx) {
      if (ctx.dev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
