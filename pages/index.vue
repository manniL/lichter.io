<template>
    <div>
        <a id="top"></a>
        <intro/>
        <a id="about-me"></a>
        <about-me/>
        <a id="skills"></a>
        <skills/>
        <a id="timeline"></a>
        <timeline/>
    </div>
</template>

<script>
  import Intro from '~/components/Intro.vue'
  import AboutMe from '~/components/AboutMe.vue'
  import Skills from '~/components/Skills.vue'
  import Timeline from '~/components/Timeline.vue'

  export default {
    components: {
      Intro,
      AboutMe,
      Skills,
      Timeline
    }
  }
</script>