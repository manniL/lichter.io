<template>

    <div>
        <navbar></navbar>
        <intro></intro>
        <about-me></about-me>
        <timeline></timeline>
    </div>
</template>

<script>
  import Navbar from './Navbar.vue'
  import Intro from './Intro.vue'
  import AboutMe from './AboutMe.vue'
  import Timeline from './Timeline.vue'

  export default {
    name: 'HelloWorld',
    components: {
      Navbar,
      Intro,
      AboutMe,
      Timeline
    },
    data () {
      return {
        msg: 'Welcome to Your Vue.js App'
      }
    }
  }
</script>