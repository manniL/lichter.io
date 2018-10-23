import tailwindcss from 'tailwindcss'
import { isDev } from './utils'

export default {
  extractCSS: true,
  parallel: isDev,
  cache: isDev,
  publicPath: '/assets/',
  optimization: {
    splitChunks: {
      name: true
    }
  },
  transpile: [/^vue-if-bot($|\/)/, /^vue-cookieconsent-component($|\/)/],

  postcss: [
    tailwindcss('./tailwind.js')
  ],
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
