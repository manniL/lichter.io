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

<script>
import Timeline from '@/components/Timeline'

export default {
  components: { Timeline },
  head () {
    const title = 'My Timeline'
    const metaDescription = 'Some of the most important achievements and events in my life, mostly with a career and work perspective.'
    return {
      title,
      meta: [
        {
          hid: 'og:title',
          name: 'og:title',
          content: title
        },
        {
          hid: 'description',
          name: 'description',
          content: metaDescription
        },
        {
          hid: 'og:description',
          name: 'og:description',
          content: metaDescription
        }
      ]
    }
  }

}
</script>
