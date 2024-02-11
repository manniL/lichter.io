<script setup lang="ts">
import type { QueryBuilderParams } from '@nuxt/content/dist/runtime/types'
import type { Article } from '~/types.js';

definePageMeta({
  documentDriven: false
})

// TODO: Remove type casting after https://github.com/nuxt/content/pull/2156 landed

const query: QueryBuilderParams = { path: '/articles', sort: [{ dateModified: -1, datePublished: -1 }] }

const title = 'Articles'
const description = 'I am regularly writing articles about web development, JavaScript, TypeScript, Vue.js, Nuxt.js, and other topics. From introductions to deep dives and tutorials, you can find a wide range of content.'

useSeoMeta({
  title,
  description,
})

defineOgImageComponent('Article')
</script>

<template>
  <AppSection>
    <ParagraphDecoration class="mt-16" />
    <AppParagraph class="mt-4" tag="h1" look="heading">Articles</AppParagraph>
    <AppParagraph class="max-w-3xl mt-8" look="subParagraph">
      Below you can find a list of my talks, podcast appearances, given workshops and panels.
      If you are interested in more than just the excerpt, title and brief topics, click on the entry to get to the
      slides, videos or recording link!
    </AppParagraph>
    <div class="space-y-8 md:space-y-0 md:grid grid-cols-2 gap-12 justify-around mt-8">
      <ContentList :query="query" v-slot="{ list }">
        <ArticlePreview v-for="entry in list" :key="entry._path" :article="(entry as Article)" />
      </ContentList>
    </div>
  </AppSection>
</template>