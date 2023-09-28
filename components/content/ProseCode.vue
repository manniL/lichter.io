<script setup lang="ts">
import { ref } from 'vue'
import type { Lang } from 'shiki-es'

defineProps<{
  code: string,
  language: Lang,
  filename?: string,
  highlights?: number[],
  meta?: string
}>()

const hovered = ref(false)
</script>

<template>
  <div :class="`highlight-${language}`" class="group relative" @mouseenter="hovered = true" @mouseleave="hovered = false">
    <span v-show="filename" class="absolute top-0 right-0 px-2 py-3 font-mono rounded-lg text-xs leading-normal transition-opacity duration-200 backdrop-blur group-hover:opacity-0 mt-1 mr-1">
      {{ filename }}
    </span>
    <slot />

    <ProseCodeCopyButton :content="code" />
  </div>
</template>