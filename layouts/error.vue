<template>
  <section class="flex flex-col items-center mt-6">
    <h1 class="my-2">
      Nothing to see here!
    </h1>
    <p class="leading-loose mt-4">
      Looks like you took a wrong path!
    </p>
    <NuxtLink
      to="/"
      class="text-gray-darkest my-4"
    >
      Get back
    </NuxtLink>
    <img
      class="mb-8"
      src="https://thecatapi.com/api/images/get?format=src&type=gif"
    >
    <div class="block h-screen" />
  </section>
</template>

<script>
export default {
  head () {
    return {
      title: '404 - No Lichter found!'
    }
  }
}
</script>
