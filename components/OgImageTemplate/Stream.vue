<script setup lang="ts">
// inherited attrs can mess up the satori parser
defineOptions({
  inheritAttrs: false,
})

const bgGradientStyle = {
  backgroundImage: 'linear-gradient(to right, #dc2626, #be185d)',
}

</script>
<template>
  <div class="p-4 h-full w-full flex justify-center items-center" :style="bgGradientStyle">
    <div class="p-10 bg-zinc-900 h-full w-full"
      style="background-image: url(https://img.lichter.io/website-og/speaking.png); display: flex; flex-direction: column; justify-content: space-between;">
      <div class="w-full h-full flex flex-col">
        <h1 class="font-bold text-white text-5xl">
          LIVE NOW - Open Source Launch
        </h1>
        <h2 class="font-bold text-white text-4xl">
          Join me on Twitch for the launch of my website
        </h2>
        <h2 class="text-4xl text-white flex items-center  mt-16">
          <Icon name="mdi:twitch" class="text-purple-800 text-6xl mr-4"/>
          <span>twitch.tv/TheAlexLichter</span>
        </h2>
      </div>
      <!-- Weird hack so the lower line is correct when rendering svg -->
      <div style="display: flex; margin-top: -6rem;">
        <div class="mr-auto" style="display: flex;">
          <img width="64" height="64" class="mr-4 rounded-full mt-2" src="/img/me@2x.jpg" />
          <div style="display: flex; flex-direction: column; justify-content: center;">
            <div class="text-2xl leading-none text-white">Alexander Lichter</div>
            <div class="text-white/50 text-lg leading-none mt-2">https://lichter.io</div>
          </div>
        </div>
        <img width="64" src="/img/logo/glyph-white-colored.svg" />
      </div>
    </div>
  </div>
</template>