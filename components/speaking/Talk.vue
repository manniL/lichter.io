<template>
  <article class="py-4 pb-16 my-4 border-b border-gray-400 last:border-b-0 flex flex-col md:flex-row justify-center">
    <div class="flex flex-col flex-1">
      <div>
        <template v-if="isUpcoming">
          <div class="block mb-2">
            <span class="inline bg-gray-700 text-gray-100 rounded px-2 py-1">
              Upcoming
            </span>
          </div>
        </template>
        <h2 class="text-2xl inline-block py-1">
          {{ talk.title }}
        </h2>
      </div>
      <div class="text-gray-700">
        <a :class="[talk.eventUrl && 'underline hover:no-underline inline-block hover:text-gray-800']" v-bind="talk.eventUrl ? { href: talk.eventUrl, rel: 'nofollow noopener' } : {}">
          {{ talk.eventName }}
        </a>
        <template v-if="talk.location">
          &bull;
          <span>{{ talk.location }}</span>
        </template>
        <template v-if="talk.date">
          &bull;
          <time>{{ formattedDate }}</time>
        </template>
      </div>
      <div class="flex md:flex-col mt-8">
        <a
          v-if="talk.videoUrl"
          :href="talk.videoUrl"
          target="_blank"
          rel="noopener nofollow"
          class="group flex items-center mr-8 md:mr-0"
          :title="`Open video for ${talk.title}`"
        >
          <svg class="w-6 h-6 mr-2 group" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" role="presentation">
            <description>
              Video camera icon which will open the page of the talk's video recording on click
            </description>
            <path
              class="fill-current text-gray-800 group-hover:text-gray-700"
              d="M13.59 12l6.7-6.7A1 1 0 0 1 22 6v12a1 1 0 0 1-1.7.7L13.58 12z"
            />
            <rect
              class="fill-current text-gray-600 group-hover:text-gray-500"
              height="14"
              rx="2"
              width="14"
              x="2"
              y="5"
            />
          </svg>
          <span class="group-hover:underline text-lg">Video</span>
        </a>
        <template>
          <a
            v-if="talk.slidesUrl"
            :href="talk.slidesUrl"
            target="_blank"
            rel="noopener nofollow"
            class="group flex items-center"
            :class="talk.videoUrl && 'mt-6'"
            :title="`Open slides for ${talk.title}`"
          >
            <svg class="w-6 h-6 mr-2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" role="presentation">
              <description>
                Presentation stand icon which will open the page of the talk's slides on click
              </description>
              <path
                class="fill-current text-gray-800 group-hover:text-gray-700"
                d="M11 18.62l-6.55 3.27a1 1 0 0 1-.9-1.78L11 16.38V5a1 1 0 0 1 2 0v11.38l7.45 3.73a1 1 0 0 1-.9 1.78L13 18.62V21a1 1 0 0 1-2 0v-2.38z"
              />
              <path
                class="fill-current text-gray-600 group-hover:text-gray-500"
                d="M21 14a1 1 0 0 1 0 2H3a1 1 0 0 1 0-2V4a1 1 0 1 1 0-2h18a1 1 0 0 1 0 2v10z"
              />
            </svg>
            <span class="group-hover:underline text-lg">Slides</span>
          </a>
          <span v-else class="group-hover:underline text-gray-800">
            No slides available {{ isUpcoming ? 'yet' : '' }}
          </span>
        </template>
      </div>
    </div>
    <p class="flex-1 mt-8 md:mt-0">
      {{ talk.description || 'No description' }}
    </p>
  </article>
</template>

<script>
import { format, isFuture } from 'date-fns'

export default {
  props: {
    talk: {
      type: Object,
      required: true
    }
  },
  computed: {
    formattedDate () {
      if (!this.talk.date) {
        return ''
      }

      return format(new Date(this.talk.date), `do 'of' MMMM yyyy`)
    },
    isUpcoming () {
      if (!this.talk.date) {
        return ''
      }

      return isFuture(new Date(this.talk.date))
    }
  }
}
</script>