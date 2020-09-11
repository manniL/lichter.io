<template>
  <div>
    <Intro />
    <AboutMe />
    <Skills id="skills" />
  </div>
</template>

<script>
import Intro from '~/components/Intro.vue'
import AboutMe from '~/components/AboutMe.vue'

export default {
  components: {
    Intro,
    AboutMe,
    Skills: () => import('~/components/Skills.vue')
  },
  head () {
    return {
      title: ''
    }
  }
}
</script>
