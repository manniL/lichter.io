<script setup lang="ts">
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue'

const MENU_ITEMS = [
  { text: 'Articles', to: '/articles/', activeRoutes: [] },
  { text: 'Speaking', to: '/speaking/', activeRoutes: [] },
  { text: 'Services', to: '/services/', activeRoutes: ['/workshops/', '/consulting/'] },
  // { text: 'Projects', to: '/projects' },
  { text: 'About', to: '/about/', activeRoutes: [] },
  { text: 'Contact', to: '/contact/', activeRoutes: [] },
] as const

const streamChangesEndpoint = 'https://raw.githubusercontent.com/manniL/lichter.io-twitch-status/main/latest.json'

const { data, refresh } = useLazyFetch<any>(streamChangesEndpoint, { server: false })

const isLive = computed(() => data.value?.title)

// Refresh data every 10 minutes
useIntervalFn(refresh, 1000 * 60 * 10)

</script>
<template>
  <Disclosure as="nav" v-slot="{ open }">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="flex h-20 items-center justify-between">
        <div class="flex items-center mr-3">
          <AppLink to="/" class="flex-shrink-0 flex items-center">
            <img width="44" height="56" class="mr-4" src="/img/logo/glyph-white-colored.svg"
              alt="Alexander Lichter Lightbulb" />
            <img width="107" height="40" src="/img/logo/word-white-colored.svg" alt="Alexander Lichter Lightbulb" />
          </AppLink>
        </div>
        <div class="hidden sm:ml-6 sm:block">
          <div class="flex gap-x-4 items-center">
            <AppLink v-for="item in MENU_ITEMS" :to="item.to"
              :class="{ '!border-red-500 text-red-500': $route.path.startsWith(item.to) || item.activeRoutes.some(route => $route.path.startsWith(route)) }"
              class="transition-all duration-200 border-b-2 border-transparent px-1 pt-1 py-1 px-2 md:px-3 md:py-2 text-base font-medium text-gray-300 hover:text-red-500">
              {{ item.text }}</AppLink>
            <AppLink :to="SOCIALS.twitch" title="To my Twitch Channel" active-class="!border-red-500 text-red-500"
              class="transition-all inline-block relative duration-200 border-b-2 border-transparent py-1 md:px-3 md:py-2 text-base font-medium text-gray-300 hover:text-red-500">
              <template v-if="isLive">
                <span>
                  <Icon class="text-purple-700 lg:mr-2 text-lg" name="mdi:twitch" />
                  <span class="hidden lg:inline">LIVE NOW</span>
                </span>
                <span
                  class="animate-ping inline-flex absolute h-4 w-4 top-0 right-0 rounded-full bg-red-700 opacity-50" />
              </template>
            </AppLink>
          </div>
        </div>
        <div class="flex sm:hidden items-center gap-4">
          <AppLink v-if="isLive" :to="SOCIALS.twitch" title="To my Twitch Channel"
            active-class="!border-red-500 text-red-500"
            class="transition-all inline-block relative duration-200 py-1 text-base font-medium">
            <span>
              <Icon class="text-purple-700 lg:mr-2 text-lg" name="mdi:twitch" />
            </span>
            <span class="animate-ping inline-flex absolute h-4 w-4 top-0 right-0 rounded-full bg-red-700 opacity-50" />
          </AppLink>
          <div class="-mr-2 flex sm:hidden">
            <!-- Mobile menu button -->
            <DisclosureButton
              class="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
              <span class="absolute -inset-0.5" />
              <span class="sr-only">Open main menu</span>
              <Icon :name="open ? 'heroicons:x-mark' : 'heroicons:bars-3'" class="block h-6 w-6" aria-hidden="true" />
            </DisclosureButton>
          </div>
        </div>
      </div>
    </div>

    <DisclosurePanel class="sm:hidden" v-slot="{ close }">
      <div class="space-y-1 px-2 pb-3 pt-2">
        <DisclosureButton v-for="item in MENU_ITEMS" as="span">
          <AppLink active-class="text-red-500" :to="item.to" @click="close"
            class="transition-all block duration-200 rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:text-red-500">
            {{ item.text }}</AppLink>
        </DisclosureButton>
      </div>
    </DisclosurePanel>
  </Disclosure>
</template>