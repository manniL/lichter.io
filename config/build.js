import path from 'path'
import { isDev } from './utils'

export default {
  parallel: isDev,
  cache: isDev,
  filenames: {
    img: ({ isDev }) => isDev ? '[path][name].[ext]' : 'img/[name]-[hash:7].[ext]',
    font: ({ isDev }) => isDev ? '[path][name].[ext]' : 'fonts/[name]-[hash:7].[ext]'
  },
  publicPath: '/assets/',
  transpile: [/^vue-if-bot($|\/)/, /^vue-cookieconsent-component($|\/)/],

  postcss: {
    plugins: {
      tailwindcss: path.resolve(__dirname, 'tailwind.config.js'),
      'postcss-nested': {}
    }
  },
  extend (config, ctx) {
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
