<template>
  <div>
    <intro/>
    <a id="about-me"/>
    <about-me/>
    <a id="skills"/>
    <skills :class="hiddenOnSSR"/>
    <a id="timeline"/>
    <timeline :class="hiddenOnSSR"/>
  </div>
</template>

<script>
import Intro from '~/components/Intro.vue'
import AboutMe from '~/components/AboutMe.vue'

export default {
  components: {
    Intro,
    AboutMe,
    Skills: () => import('~/components/Skills.vue'),
    Timeline: () => import('~/components/Timeline.vue')
  },
  computed: {
    hiddenOnSSR() {
      if (process.client) {
        return ''
      }
      return 'opacity-0'
    }
  }
}
</script>
