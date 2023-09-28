<script setup lang="ts">
import type { TalkPreview } from '~/types.js';

const props = defineProps<{
  talk: TalkPreview
}>()

// TODO: Differentiate between german and english items
// TODO: Highlight upcoming talks somehow!
const isUpcoming = computed(() => {
  if (!props.talk.date) {
    return false
  }

  const now = new Date()
  const eventDate = new Date(props.talk.date)
  return eventDate > now
})

const isHoveringOverLink = ref(false)
function handleMouseOver() {
  isHoveringOverLink.value = true;
}
function handleMouseLeave() {
  isHoveringOverLink.value = false;
}
</script>

<template>
  <div class="md:grid md:grid-cols-2 gap-8 bg-zinc-800 p-8 transition-all border border-transparent"
    :class="isHoveringOverLink && 'hover:border-red-500'">
    <div>
      <header class="flex-grow">
        <AppLink class="transition-all underline decoration-transparent hover:decoration-white"
          @mouseover="handleMouseOver" @mouseleave="handleMouseLeave" :to="talk._path">
          <AppParagraph tag="h3" class="inline text-2xl font-semibold">{{ talk.title }}</AppParagraph>
        </AppLink>
      </header>
      <ul class="flex flex-col md:flex-row mt-4">
        <li v-if="talk.eventName">
          <AppLink v-if="talk.eventUrl" rel="noindex nofollow"
            class="inline-block underline decoration-white hover:decoration-transparent transition-all mr-1"
            :to="talk.eventUrl">
            {{ talk.eventName }}
          </AppLink>
          <span v-else class="mr-1">{{ talk.eventName }}</span>
          <span v-if="talk.location || talk.date" class="hidden md:inline-block" aria-hidden>&bull;&nbsp;</span>
        </li>
        <li class="text-sm md:text-base mt-4 md:mt-0" v-if="talk.location">
          {{ talk.location }}
          <span v-if="talk.date" class="hidden md:inline-block" aria-hidden>&bull;&nbsp;</span>
        </li>
        <li class="text-sm md:text-base" v-if="talk.date">{{ talk.date }}</li>
      </ul>
      <ul class="flex flex-wrap md:flex-nowrap gap-8 mt-4">
        <li v-for="topic in talk.topics.slice(0, 3)">
          <AppLink class="hover:underline" :to="`/topics/${topic}`">#{{ topic }}</AppLink>
        </li>
      </ul>
    </div>
    <p class="mt-8 prose md:mt-0">
      {{ talk.description }}
    </p>
    <div class="mt-8 md:mt-0 md:col-span-2 flex flex-col md:flex-row md:justify-between">
      <ul class="flex gap-4 md:gap-8">
        <li v-if="talk.slidesUrl">
          <AppLink class="border-b-4 border-white/75 hover:border-white transition-all pr-1 pb-1" :to="talk.slidesUrl">
            <Icon name="heroicons:bookmark" /> Slides
          </AppLink>
        </li>
        <li v-if="talk.videoUrl">
          <AppLink class="border-b-4 border-white/75 hover:border-white transition-all pr-1 pb-1" :to="talk.videoUrl">
            <Icon name="heroicons:play" /> Watch
          </AppLink>
        </li>
        <li v-if="talk.podcastUrl">
          <AppLink class="border-b-4 border-white/75 hover:border-white transition-all pr-1 pb-1" :to="talk.podcastUrl">
            <Icon name="heroicons:microphone" /> Listen
          </AppLink>
        </li>
      </ul>
      <AppLink
        class="underline decoration-transparent hover:decoration-white transition-all mt-8 md:mt-0 text-right md:text-left"
        @mouseover="handleMouseOver" @mouseleave="handleMouseLeave" :to="talk._path"
        :title="`Read more about about${talk.title}`">
        Read more
        <Icon name="heroicons:chevron-double-right-20-solid" />
      </AppLink>
    </div>
  </div>
</template>