<script setup lang="ts">
import type { QueryBuilderParams } from '@nuxt/content/dist/runtime/types'
import type { Talk } from '~/types.js';

// TODO: Remove type casting after https://github.com/nuxt/content/pull/2156 landed

definePageMeta({
  documentDriven: false
})

const title = 'Talks and Podcast'
const description = `Take a look at my talks, podcast appearances and panels I have given or participated in. Topics are among others Vue.js, Nuxt.js, TypeScript, JavaScript, Web Development, Performance, Clean Code as well as my personal story and experiences.`

useSeoMeta({
  title,
  description,
})

defineOgImageComponent('Speaking', {
  title: 'Talks and Podcasts'
})

const query: QueryBuilderParams = { path: '/speaking', sort: [{ date: -1 }], without: ['body', 'excerpt'] }
</script>

<template>
  <AppSection>
    <ParagraphDecoration class="mt-16" />
    <AppParagraph class="mt-4" tag="h1" look="heading">Speaking</AppParagraph>
    <AppParagraph class="max-w-3xl mt-8" look="subParagraph">
      Below you can find a list of my talks, podcast appearances, given workshops and panels.
      If you are interested in more than just the excerpt, title and brief topics, click on the entry to get to the
      slides, videos or recording link!
    </AppParagraph>
    <div class="space-y-8 mt-8">
      <ContentList :query="query" v-slot="{ list }">
        <SpeakingPreview v-for="entry in list" :key="entry._path" :talk="(entry as Talk)" />
      </ContentList>
    </div>
  </AppSection>
</template>