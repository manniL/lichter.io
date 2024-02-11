<script setup lang="ts">
import { type QueryBuilderParams } from '@nuxt/content/dist/runtime/types/index.js';

definePageMeta({
  documentDriven: false
})

const title = 'Workshops'
const description = 'Want to upgrade your team\'s skills? I offer various workshops on Vue.js, Nuxt.js, TypeScript, JavaScript, Web Development, Performance, Clean Code and more. Take a look at the list below or contact me for a custom workshop!'

useSeoMeta({
  title,
  description,
})

defineOgImageComponent('Workshop')

const query: QueryBuilderParams = { path: '/workshops', without: ['body', 'excerpt'] }
</script>

<template>
  <AppSection>
    <ParagraphDecoration class="mt-16" />
    <AppParagraph class="mt-4" tag="h1" look="heading">Workshops</AppParagraph>
    <AppParagraph class="max-w-3xl mt-8" look="subParagraph">
      Here I've listed various workshops I am offering. It is no problem to tailor them to your needs or create a
      completely custom workshop for you and your team.
      Just <AppLink to="/contact/" class="underline hover:no-underline">contact me</AppLink> and we'll figure it out!
    </AppParagraph>
    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-16 md:gap-8 mt-8">
      <ContentList :query="query" v-slot="{ list }">
        <WorkshopPreview v-for="entry in list" :key="entry._path" :workshop="entry" />
      </ContentList>
    </div>
  </AppSection>
</template>
