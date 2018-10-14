import shrinkRay from 'shrink-ray-current'

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
    }
  },
  compressor: shrinkRay()
}
