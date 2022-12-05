import VueGtag, { trackRouter } from 'vue-gtag-next'

export default defineNuxtPlugin((nuxtApp) => {
  const { hasOptedOut } = useAnalyticsOptOut()
  if(hasOptedOut.value) {
    return
  }
  
  const config = useRuntimeConfig()
  const id = config.public.analyticsId

  nuxtApp.vueApp.use(VueGtag, {
    property: {
      id,
      params: {
        anonymize_ip: true,
      },
    },
  })

  const router = useRouter()
  trackRouter(router)
})
