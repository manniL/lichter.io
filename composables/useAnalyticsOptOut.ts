export const useAnalyticsOptOut = () => {
  const optOutCookie = useCookie('ga_optout', {
    expires: new Date('Thu, 31 Dec 2099 23:59:59 UTC')
  })
  const optOut = () => {
    optOutCookie.value = 'true'
    window.location.reload()
  }
  return {
    optOutCookie,
    hasOptedOut: computed(() => optOutCookie.value),
    optOut
  }
}