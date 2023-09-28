<script setup lang="ts">
import type { TocLink } from '@nuxt/content/dist/runtime/types'

defineProps<{
  links: TocLink[]
}>()
</script>

<template>
  <ul>
    <li v-for="link in links" :key="link.text">
      <AppLink :to="`#${link.id}`">
        {{ link.text }}
      </AppLink>
      <TocLinks v-if="link.children" :links="link.children" />
    </li>
  </ul>
</template>