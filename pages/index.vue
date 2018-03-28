<template>
  <div>
    <a id="top"/>
    <intro/>
    <a id="about-me"/>
    <about-me/>
    <a id="skills"/>
    <skills/>
    <a id="timeline"/>
    <timeline/>
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
  }
}
</script>
