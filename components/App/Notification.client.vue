<script setup lang="ts">
import type { AppNotification } from '~/types.js';

// TODO: Use AppNotification type from types.js

withDefaults(defineProps<AppNotification>(), {
  iconName: 'mdi:lightbulb-on-outline',
  iconClass: 'text-yellow-400',
})

const emit = defineEmits<{
  close: [id: string]
}>()
</script>

<template>
  <div
    class="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-zinc-900 shadow-lg ring-1 ring-white ring-opacity-25">
    <div class="p-4">
      <div class="flex items-start">
        <div class="flex-shrink-0">
          <Icon :name="iconName" class="h-6 w-6" :class="iconClass" aria-hidden="true" />
        </div>
        <div class="ml-3 w-0 flex-1 pt-0.5">
          <p class="text-sm font-medium text-gray-300">{{heading}}</p>
          <AppNotificationBody class="mt-1 text-sm text-slate-400" :body="body" />
        </div>
        <div class="ml-4 flex flex-shrink-0">
          <button type="button" @click="emit('close', id)"
            class="inline-flex rounded-md bg-zinc-700 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400">
            <span class="sr-only">Close</span>
            <Icon name="heroicons:x-mark-20-solid" class="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>