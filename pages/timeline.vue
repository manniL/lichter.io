<script setup lang="ts">
const title = 'My Timeline'
const metaDescription = 'Some of the most important achievements and events in my life, mostly with a career and work perspective.'
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
  <div style="background: linear-gradient(to bottom, #eee, #fff 15%)">
    <section class="container mx-auto pt-16">
      <div class="w-5/6 sm:w-2/3 mx-auto">
        <h1 class="text-2xl font-bold text-center">
          My Timeline
        </h1>
        <Timeline />
      </div>
    </section>
  </div>
</template>