<template>
  <div>
    <Intro />
    <a id="about-me" />
    <AboutMe />
    <a id="skills" />
    <Skills />
    <a id="timeline" />
    <Timeline />
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
