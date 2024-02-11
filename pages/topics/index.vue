<script setup lang="ts">
import type { QueryBuilderParams } from '@nuxt/content/dist/runtime/types'

definePageMeta({
  documentDriven: false
})

const title = 'Topics'
const description = 'Being it talks, workshops, panels, podcasts or blog posts, here you can find all my content sorted by topic.'

useSeoMeta({
  title,
  description,
})

defineOgImageComponent('Speaking')

const query: QueryBuilderParams = { path: '/topics', only: ['title', '_path'] }
</script>

<template>
  <AppSection>
    <ParagraphDecoration class="mt-16" />
    <AppParagraph class="mt-4" tag="h1" look="heading">{{ title }}</AppParagraph>
    <AppParagraph class="max-w-3xl mt-8" look="subParagraph">
      Below you can find a list of my talks, podcast appearances, given workshops and panels. All, sorted by topics that
      might interest you.
    </AppParagraph>
    <div class="flex flex-wrap gap-8 mt-8">
      <ContentList :query="query" v-slot="{ list }">
        <TopicPreview v-for="topic in list" :key="topic._path" :topic="{ _path: topic._path!, title: topic.title! }" />
      </ContentList>
    </div>
  </AppSection>
</template>