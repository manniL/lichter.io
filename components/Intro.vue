<template>
  <section class="flex flex-wrap bg-gray-200 py-6 md:py-10">
    <div class="flex flex-col justify-around items-center w-5/6 md:w-1/2 mx-auto text-center zoom-in">
      <picture>
        <source srcset="/img/me@2x.webp 2x, /img/me.webp 1x" type="image/webp">
        <source srcset="/img/me@2x.jpg 2x, /img/me.jpg 1x" type="image/jpeg">
        <source srcset="/img/me@2x.avif 2x, /img/me.avif 1x" type="image/avif">
        <img alt="Head shot of Alexander Lichter"
          class="rounded-full border-solid border-4 shadow-inset w-64 h-64" height="256" src="/img/me.jpg" width="256">
      </picture>
      <div class="mt-4">
        <h1 class="font-400 text-2xl md:text-3xl">
          Alexander Lichter
        </h1>
        <h2 class="text-gray-700 -mt-1 text-base md:text-xl">
          Developer &bull; Founder &bull; Speaker
        </h2>
      </div>
      <div class="flex mt-4">
        <NuxtLink :class="linkClass" class="hover:text-black" to="https://github.com/manniL" title="My GitHub account">
          <Icon class="w-8 h-8" name="carbon:logo-github" />
        </NuxtLink>
        <NuxtLink :class="linkClass" class="hover:text-indigo-600" to="mailto:hello@lichter.io"
          title="Send me an e-mail!">
          <Icon class="w-8 h-8" name="heroicons:envelope-solid" />
        </NuxtLink>
        <NuxtLink :class="linkClass" class="hover:text-green-600" to="tel:+4917670625208" title="Hotline Bling?">
          <Icon class="w-8 h-8" name="heroicons:phone-solid" />
        </NuxtLink>
        <NuxtLink :class="linkClass" class="hover:text-blue-500" to="https://twitter.com/TheAlexLichter"
          title="I'm on Twitter as well">
          <Icon class="w-8 h-8 scale-125" name="carbon:logo-twitter" />
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const linkClass = "text-center text-gray-600 no-underline shadow-lg bg-gray-300 transition-all border border-gray-400 hover:border-gray-500 hover:shadow-xl px-3 py-2 m-2 rounded"
</script>

<style>
@keyframes zoom-in {
  from {
    opacity: 0;
    transform: scale3d(.3, .3, .3);
  }

  50% {
    opacity: 1;
  }
}

.zoom-in {
  animation-duration: 1s;
  animation-fill-mode: both;
  animation-name: zoom-in;
}
</style>
