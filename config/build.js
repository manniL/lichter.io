import path from 'path'
import glob from 'glob-all'
import tailwindcss from 'tailwindcss'
import PurgecssPlugin from 'purgecss-webpack-plugin/lib/purgecss-webpack-plugin.es'
import { isDev } from './utils'

export default {
  extractCSS: true,
  parallel: isDev,
  cache: isDev,
  optimization: {
    splitChunks: {
      name: true
    }
  },
  transpile: [/vue-if-bot/],
  postcss: [
    tailwindcss('./tailwind.js')
  ],
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
        config.plugins.push(new PurgecssPlugin({
          paths: glob.sync([
            path.join(__dirname, '../components/**/*.vue'),
            path.join(__dirname, '../layouts/**/*.vue'),
            path.join(__dirname, '../pages/**/*.vue'),
            path.join(__dirname, '../plugins/**/*.vue')
          ]),
          styleExtensions: ['.css'],
          whitelist: ['body', 'html', 'nuxt-progress'],
          whitelistPatterns: [/cookie-consent/],
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
