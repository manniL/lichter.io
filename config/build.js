import { isDev } from './utils'

export default {
  parallel: isDev,
  cache: isDev,
  publicPath: '/assets/',
  transpile: [/^vue-if-bot($|\/)/, /^vue-cookieconsent-component($|\/)/],

  postcss: {
    plugins: {
      'tailwindcss': './tailwind.js',
      'postcss-nested': {}
    }
  },
  extend(config, ctx) {
    if (ctx.isClient) {
      if (ctx.isDev) {
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
