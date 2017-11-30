<template>
    <div>
        <navbar></navbar>
        <section class="flex flex-col items-center mt-6">
            <h1 class="my-2">Nothing to see here!</h1>
            <p class="leading-loose mt-4">Looks like you took a wrong path!</p>
            <router-link to="/" class="text-grey-darkest my-4">Back</router-link>
            <img src="https://thecatapi.com/api/images/get?format=src&type=gif">
        </section>
    </div>
</template>

<script>
  import Navbar from '../components/Navbar.vue'

  export default {
    name: 'NotFoundPage',
    components: {
      Navbar
    }
  }
</script>