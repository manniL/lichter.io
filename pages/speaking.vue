<script setup lang="ts">
import { TALKS } from '~/data/talks'
const title = 'Speaking - My Talks'
const metaDescription = 'A list of all talks I\'ve given on conferences, meetups and other events. Slides and video, if available, are linked to each talk.'
useHead({
  title,
  meta: [
    {
      name: 'og:title',
      content: title
    },
    {
      name: 'description',
      content: metaDescription
    },
    {
      name: 'og:description',
      content: metaDescription
    }
  ]
})
</script>

<template>
  <div class="bg-gray-300 px-4 py-16">
    <div class="container mx-auto">
      <h1 class="text-2xl font-bold text-center">
        Speaking - My past and upcoming talks
      </h1>
      <p class="mt-16 max-w-4xl mx-auto">
        Speaking was always fun and exciting for me. Already during my school time I was often on stage.
        Nowadays I have the pleasure to speak at international conferences, medium-to-large sized companies but also at
        local meetups.
        If you think I'd be a good fit for your event, feel free to
        <a class="text-gray-900 font-bold hover:text-black underline"
          href="mailto:inquiry@lichter.io?subject=Speaking%20Opportunity&body=Hey%20Alex!%0D%0AI%20think%20you'd%20be%20a%20great%20fit%20for%20our%20.......">contact
          me</a>! No matter if it is a conference, a user group meeting, an internal event of your company or
        similar.
      </p>
      <section class="flex flex-col my-16">
        <SpeakingTalk v-for="talk in TALKS" :key="talk.title + talk.date" :talk="talk" />
      </section>
    </div>
  </div>
</template>