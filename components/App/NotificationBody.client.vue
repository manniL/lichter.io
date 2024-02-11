<script setup lang="ts">
import type { AppNotification } from '~/types.js';

// TODO: Use AppNotification type from types.js

const props = defineProps<{
  body: AppNotification['body'],
}>()

const emit = defineEmits<{
  close: [id: string]
}>()
</script>

<template>
  <p v-if="typeof body ==='string'">{{ body }}</p>
  <p class="inline-block" v-else>
    <template v-for="entry in body">
      <template v-if="entry.type === 'text'">{{ entry.text }}</template>
      <NuxtLink class="underline hover:no-underline" :to="entry.href" v-if="entry.type === 'link'" target="_blank">{{ entry.text ?? entry.href }}</NuxtLink>
    </template>
  </p>
</template>