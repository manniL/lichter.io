<script setup lang="ts">
import type { ArticlePreview } from '~/types'

const props = defineProps<{
  article: ArticlePreview
}>()

const formattedCreatedAt = computed(() => formatDateStringToHumanReadable(props.article.datePublished))
</script>

<template>
  <AppLink :to="article._path"
    class="inline-block group border-l-4 border-red-500 relative flex flex-col justify-between hover:bg-gradient-to-r hover:-translate-y-2 hover:border-zinc-300 transition-all duration-500 from-red-500/60 to-pink-600/60 p-8 bg-zinc-800">
    <AppParagraph tag="h3" class="text-2xl font-semibold">{{ article.title }}</AppParagraph>
    <div class="mt-4 md:mt-2 md:flex gap-4">
      <div>{{ formattedCreatedAt }}</div>
      <ul class="flex gap-2">
        <li v-for="topic in article.topics">#{{topic}}</li>
      </ul>
    </div>
    <AppParagraph v-if="article.description" look="subParagraph"
      class="mt-8 !font-normal text-gray-300 group-hover:text-gray-200">
      {{ article.description }}
    </AppParagraph>
  </AppLink>
</template>