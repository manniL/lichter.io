<template>
  <div>
    <Intro />
    <AboutMe />
    <a id="skills" />
    <Skills />
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
