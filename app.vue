<template>
  <div>
    <CookieConsent />
    <Navbar />
    <NuxtPage class="min-h-screen" />
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
const { siteUrl } = useRuntimeConfig()
const route = useRoute()
const canonical = computed(() => {
  const pathWithSlash = route.path.endsWith('/') ? route.path : `${route.path}/`
  return `${siteUrl}${pathWithSlash}`
})

useHead({
  titleTemplate: (c) => c ? `${c} - Lichter.io` : 'Lichter.io - Alexander Lichter',
  link: [
    { rel: 'canonical', href: canonical }
  ]
})
</script>