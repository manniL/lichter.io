export default {
  bundleRenderer: {
    shouldPreload: (file, type) => {
      if (type === 'script') {
        const ignoredRoutes = ['legal']
        if (ignoredRoutes.some(r => file.includes(r))) {
          return false
        }
      }
      return ['script', 'style', 'font'].includes(type)
    },
    directives: {
      'v-scroll-reveal': (node) => {
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
