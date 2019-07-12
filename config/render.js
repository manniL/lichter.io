export default {
  bundleRenderer: {
    directives: {
      scrollReveal (node) {
        const cssClass = node.data.class || (node.data.class = {})
        if (Array.isArray(cssClass)) {
          cssClass.push('opacity-0')
        } else {
          cssClass.class = 'opacity-0'
        }
      }
    }
  }
}
