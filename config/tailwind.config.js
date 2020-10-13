module.exports = {
  theme: {
    typography: {
      default: {
        css: {
          a: {
            '&:hover': {
              textDecoration: 'none'
            }
          }
        }
      }
    }
  },
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
    defaultLineHeights: true,
    standardFontWeights: true
  },
  plugins: [
    require('@tailwindcss/typography')
  ],
  variants: {
    textColor: ['responsive', 'hover', 'focus', 'group-hover'],
    borderWidth: ['responsive', 'last', 'hover', 'focus'],
    animation: ['responsive', 'motion-safe', 'motion-reduce'],
    transitionProperty: ['responsive', 'motion-safe', 'motion-reduce'],
    rotate: ['responsive', 'hover', 'focus', 'group-hover'],
    textDecoration: ['responsive', 'hover', 'focus', 'active', 'group-hover']
  }
}
