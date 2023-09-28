<script setup lang="ts">
defineProps<{
  href: string
  target?: '_blank' | '_parent' | '_self' | '_top'
}>()
</script>

<template>
  <AppLink :to="href" :target="target">
    <slot />
  </AppLink>
</template>