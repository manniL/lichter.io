module.exports = {
  theme: {},
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true
  },
  variants: {
    textColor: ['responsive', 'hover', 'focus', 'group-hover'],
    borderWidth: ['responsive', 'last', 'hover', 'focus'],
    textDecoration: ['responsive', 'hover', 'focus', 'active', 'group-hover']
  }
}
