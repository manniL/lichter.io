<template>
  <div>
    <!--
      <Consent message="I use Cookies for user analysis and on-page improvements!" link-label="Privacy Policy"
      href="https://lichter.io/privacy/" />
    -->
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

<style lang="pcss">
.cookie-consent {
  @apply w-full py-2 z-10 flex items-center justify-center bg-red-900 text-red-200 text-xs sticky;

  @screen md {
    @apply text-sm text-center;
  }

  &-link {
    @apply text-red-100 underline;

    &:hover {
      @apply no-underline;
    }
  }

  &-message,
  &-compliance {
    @apply mx-2 my-1 px-2;

    @screen md {
      @apply px-4;
    }
  }

  &-compliance {
    @apply cursor-pointer text-white py-2 rounded border-white border;

    &:hover {
      @apply bg-white text-black;
    }
  }
}
</style>
