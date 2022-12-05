<template>
  <div>
    <CookieConsent />
    <Navbar />
    <NuxtPage class="min-h-screen" />
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
// import Consent from 'vue-cookieconsent-component/src/components/CookieConsent.vue'
// import IfBot from 'vue-if-bot/dist/vue-if-bot.es'
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