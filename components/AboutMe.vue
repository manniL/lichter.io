<template>
  <section class="flex flex-col flex-wrap items-center bg-gray-400 pt-8 animated fade-in">
    <div class="justify-around items-center w-5/6 md:w-1/2 mx-auto pb-8 md:pb-0">
      <p class="text-xl md:text-2xl text-black mb-2">
        Hey you!
      </p>
      <p class="text-base md:text-lg text-gray-700 leading-normal">
        I'm <span class="text-gray-900" v-text="'Alex'" />, a guy in his twenties living in
        <span class="text-gray-900" v-text="'Dresden, Germany'" />. Already at young age, computers impressed me
        so much that I wanted to know more about them. Now, I'm a self-taught developer who runs his
        <span class="text-gray-900" v-text="'own company'" /> and studies CS in the meantime.
        <br><br>
        When developing web apps, I mostly rely on the <span class="text-gray-900" v-text="'Laravel'" />
        framework for the backend.
        In terms of frontend, <span class="text-gray-900" v-text="'Nuxt.js'" /> is my favorite choice,
        often in combination with a great CSS framework called <span class="text-gray-900" v-text="'TailwindCSS'" />.
        <br><br>
        Can't see parts of your tech-stack on that list? <span class="text-gray-900" v-text="'Don\'t worry!'" />
        I use the appropriate tech stack that fits the project's specifications and requirements.
      </p>
    </div>
    <VueNextLevelScroll class="cursor-pointer hidden md:block" target="#skills">
      <Icon
        class="md:my-4 motion-safe:animate-bounce fill-current text-gray-700"
        view-box="0 0 1024 1024"
        path="M840.4 300H183.6c-19.7 0-30.7 20.8-18.5 35l328.4 380.8c9.4 10.9 27.5 10.9 37 0L858.9 335c12.2-14.2 1.2-35-18.5-35z"
      />
    </VueNextLevelScroll>
  </section>
</template>

<script>
export default {
  components: {
    Icon: () => import('~/components/Icon'),
    VueNextLevelScroll: () => import('vue-next-level-scroll')
  }
}
</script>

<style lang="postcss">
  .animation-duration-4000 {
    animation-duration: 4000ms;
  }

  .bounce-nice {
    animation-name: bounce-nice;
    animation-timing-function: ease-in-out;

    @keyframes bounce-nice {
      from, to {
        transform: translateY(0px);
      }

      50% {
        transform: translateY(-30px);
      }
    }
  }
</style>
