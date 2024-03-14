<script setup lang="ts">

import type { RouteRecordRaw } from 'vue-router';

const STYLES = {
  primary: {
    needsPseudo: false,
    all: 'text-white uppercase font-semibold sm:font-bold bg-gradient-to-r from-red-500 via-pink-700 to-red-500 bg-200% hover:animate-bg-shift px-4 py-2',
  },
  secondary: {
    needsPseudo: true,
     all:'text-white uppercase font-semibold sm:font-bold bg-gradient-to-r from-red-500 to-red-500',
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
const componentToRender = computed(() => props.to ? resolveComponent('AppLink') : 'button')

</script>

<template>
  <component :is="componentToRender" :type="to ? undefined : 'button'" :class="selectedLook.all" :to="to"
    class="focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-600 inline-block">
    <template v-if="selectedLook.needsPseudo">
     <article :class="[selectedLook.main,'newButton']">
        <slot />
      </article>
    </template>
    <template v-else>
      <slot />
    </template>
  </component>
</template>
