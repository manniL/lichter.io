<script setup lang="ts">
import type { RouteRecordRaw } from 'vue-router';

const STYLES = {
  primary: {
    needsPseudo: false,
    all: 'text-white uppercase font-semibold sm:font-bold bg-gradient-to-r from-red-500 via-pink-700 to-red-500 bg-200% hover:animate-bg-shift px-4 py-2',
  },
  secondary: {
    needsPseudo: true,
    all: 'text-white uppercase font-semibold sm:font-bold group px-4 py-2 relative',
    main: 'relative z-20',
    before: 'absolute bg-gradient-to-r from-red-600 to-pink-700 top-0 left-0 w-full h-full z-10',
    after: 'group-hover:hidden absolute top-0.5 left-0.5 bottom-0 right-0 w-[calc(100%-0.25rem)] h-[calc(100%-0.25rem)] z-10'
  }
} as const

type Style = keyof typeof STYLES

const props = withDefaults(defineProps<{
  look?: Style,
  secondaryAfterBg?: string,
  to?: string | RouteRecordRaw
}>(), {
  look: 'primary',
  secondaryAfterBg: 'bg-black'
})

const selectedLook = computed(() => STYLES[props.look])
const AppLink = resolveComponent('AppLink')
const componentToRender = computed(() => props.to ? AppLink : 'button')

</script>

<template>
  <component :is="componentToRender" :type="to ? undefined : 'button'" :class="selectedLook.all" :to="to"
    class="focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-600 inline-block">
    <template v-if="selectedLook.needsPseudo">
      <span :class="selectedLook.before" />
      <span :class="'main' in selectedLook && selectedLook.main">
        <slot />
      </span>
      <span :class="[selectedLook.after, secondaryAfterBg]" />
    </template>
    <template v-else>
      <slot />
    </template>
  </component>
</template>