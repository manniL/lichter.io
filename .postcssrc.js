// https://github.com/michael-ciniawsky/postcss-load-config
const tailwindcss = require('tailwindcss')
module.exports = {
  'plugins': [
    // to edit target browsers: use "browserslist" field in package.json
    tailwindcss('tailwind.js'),
  ]
}
