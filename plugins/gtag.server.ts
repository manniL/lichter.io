export default defineNuxtPlugin((nuxtApp) => {
  const { hasOptedOut } = useAnalyticsOptOut()
  if (hasOptedOut.value) {
    return
  }

  const config = useRuntimeConfig()
  const id = config.gtagId

  const preloadLinks = [
    {
      re1l: 'preload',
      as: 'script',
      href: `https://www.googletagmanager.com/gtag/js?id=${id}`,
    },
    {
      rel: 'preconnect',
      href: 'https://www.google-analytics.com/',
    },
  ]
  nuxtApp._useHead({
    link: preloadLinks,
  })
})
