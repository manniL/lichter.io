<script setup lang="ts">
const acknowledgeCookie = useCookie('got_it', {
  expires: new Date('Thu, 31 Dec 2099 23:59:59 UTC')
})
const removeBanner = () => {
  acknowledgeCookie.value = 'true'
}
watch(acknowledgeCookie, (curr) => {
  console.log(curr)
})
</script>

<template>
  <CookieConsentContent v-if="!acknowledgeCookie" @close="removeBanner" />
</template>