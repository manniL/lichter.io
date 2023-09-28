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
    <div class="p-10 bg-zinc-900 h-full w-full" style="background-image: url(https://img.lichter.io/website-og/main-article.png); display: flex; flex-direction: column; justify-content: space-between;">
      <h1 class="font-extrabold text-transparent text-8xl" :style="{ ...bgGradientStyle, backgroundClip: 'text' }">
        Build &nbsp;//&nbsp; Lead &nbsp;//&nbsp; Teach
      </h1>
      <div style="display: flex;">
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