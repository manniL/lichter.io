<script setup lang="ts">
const acknowledgeCookie = useCookie('got_it', {
  expires: new Date('Thu, 31 Dec 2099 23:59:59 UTC')
})
const removeBanner = () => {
  acknowledgeCookie.value = 'true'
}
</script>
<template>
  <div role="dialog" v-show="!acknowledgeCookie"
    class="w-full py-2 z-10 flex items-center justify-center bg-red-900 text-red-200 text-xs sticky md:text-sm md:text-center">
    <div class="mx-2 my-1 px-2 md:px-4">
      I use 🍪 for user analysis and on-page improvements!
      More in the <NuxtLink class="text-red-100 underline hover:no-underline inline-block" to="/privacy/" no-prefetch>
        Privacy Policy
      </NuxtLink>
    </div>
    <button class="text-white py-2 rounded border-white border hover:bg-white hover:text-black mx-2 my-1 px-2 md:px-4"
      @click="removeBanner">
      Got it!
    </button>
  </div>
</template>