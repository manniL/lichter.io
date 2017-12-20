<template>
    <div>
        <navbar></navbar>
        <nuxt/>
        <app-footer></app-footer>
    </div>
</template>

<script>
  import Navbar from '~/components/Navbar.vue'
  import AppFooter from '~/components/Footer.vue'

  export default {
    components: {
      Navbar,
      AppFooter
    }
  }
</script>