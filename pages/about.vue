<script setup lang="ts">
definePageMeta({
  documentDriven: false
})

const title = 'About'
const description = 'Find out or about me as a person, my personal history, my business and open source contributions.'

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description
})

defineOgImage({
  component: 'General',
  title
})
</script>

<template>
  <div>
    <AppSection>
      <ParagraphDecoration />
      <AppParagraph look="heading" class="mt-4" tag="h1">About me</AppParagraph>
      <div class="lg:grid grid-cols-2 lg:items-end mt-16 lg:mt-0">
        <div class="lg:hidden">
          <img class="w-48 h-48 rounded-full mx-auto" width="192" height="192" src="/img/me@2x.jpg"
            alt="Photo of Alexander Lichter">
        </div>
        <div class="-mt-16 lg:mt-0">
          <div class="prose lg:prose-lg lg:mt-8">
            <h2>Hey!</h2>
            <p>
              I'm Alex, a German <b>web engineering consultant</b> and managing director living in Amsterdam, The
              Netherlands.
              Already at a young age, computers impressed me so much that I wanted to know more about them.
              And here I am, a self-taught developer for more than half my life who has been running his own company
              since 2015.
            </p>
            <p>You might know me as <b>manniL</b> or <b>TheAlexLichter</b> on various platforms.</p>

            <h2>Tech Stack</h2>

            <p>Various frameworks and libraries are a joy to work with! If I had to choose my dream tech stack though,
              I'd pick the following:</p>

            <ul class="ml-auto not-prose flex my-8 md:filter text-3xl md:text-4xl gap-4 md:gap-8 justify-center">
              <li>
                <AppLink to="/topics/nuxt" class="flex flex-col items-center group">
                  <Icon class="md:grayscale md:opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all"
                    name="logos:nuxt-icon" />
                  <p
                    class="text-sm md:text-base mt-2 text-zinc-200 md:text-gray-200/50 group-hover:text-white transition-all">
                    Nuxt.js</p>
                </AppLink>
              </li>
              <li>
                <AppLink to="/topics/vue" class="flex flex-col items-center group">
                  <Icon class="md:grayscale md:opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all"
                    name="logos:vue" />
                  <p
                    class="text-sm md:text-base mt-2 text-zinc-200 md:text-gray-200/50 group-hover:text-white transition-all">
                    Vue.js
                    (implicit)</p>
                </AppLink>
              </li>
              <li>
                <AppLink to="/topics/typescript" class="flex flex-col items-center group">
                  <Icon class="md:grayscale md:opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all"
                    name="logos:typescript-icon" />
                  <p
                    class="text-sm md:text-base mt-2 text-zinc-200 md:text-gray-200/50 group-hover:text-white transition-all">
                    TypeScript
                  </p>
                </AppLink>
              </li>
              <li>
                <AppLink to="/topics/tailwind" class="flex flex-col items-center group">
                  <Icon class="md:grayscale md:opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all"
                    name="logos:tailwindcss-icon" />
                  <p
                    class="text-sm md:text-base mt-2 text-zinc-200 md:text-gray-200/50 group-hover:text-white transition-all">
                    Tailwind CSS
                  </p>
                </AppLink>
              </li>
            </ul>

            <p>
              But of course, not all projects are greenfield projects, and often enough you have to work with legacy code.
              This is no problem at all! I'm proficient in handling (and migrating) Vue 2 and Nuxt 2, any kind of
              component library, plain JavaScript, jQuery, and others!
            </p>

            <h2>Business</h2>

            <p>
              I am offering <AppLink to="/consulting/">Consulting</AppLink>
              as well as <AppLink to="/workshops/">Workshops</AppLink>
              for companies and developers around the world via my company Developmint.
            </p>
            <p>
              Thanks to my experience in the industry, I help companies improve their development processes,
              review their code, and ensure they get the most out of their tools and libraries used.
            </p>
            <p>
              What originally started as a small software development agency back in 2015 together with my good friends
              and former business partners
              <AppLink to="https://max.codes/">
                Max
              </AppLink> and
              <AppLink class="inline-block" to="https://martin-welcker.de/">
                Martin
              </AppLink>, eventually pivoted into me being a consultant and trainer after lots of projects and experience.
            </p>

            <p>If you are interested, check out my <AppLink to="/services/">services</AppLink>!</p>

            <h2>Open Source</h2>

            <p>
              I'm a big fan of open source software and I try to contribute to it as much as my spare time allows.
              Since my <AppLink to="https://firstcommit.is/mannil">initial commit back in 2012</AppLink>
              I have been actively contributing to open source projects.
            </p>
            <p>
              Eventually, I joined the <AppLink to="https://github.com/nuxt">Nuxt.js</AppLink> team in 2018, been a
              steady
              contributor and maintainer since then.
              I'm also quite active in <AppLink to="https://discord.gg/nuxt">their Discord</AppLink>, so feel free to
              write
              me a message there too!
              In 2022, I also joined the <AppLink to="https://github.com/unjs">UnJS</AppLink> organization as a member.
            </p>
            <p>
              In the past, I also contributed to other open source projects, including
              <AppLink to="https://dev.bukkit.org/">Bukkit</AppLink>,
              <AppLink to="https://github.com/tailwindlabs/tailwindcss">TailwindCSS</AppLink>,
              <AppLink to="https://github.com/vuejs/vue">Vue.js</AppLink>,
              <AppLink to="https://github.com/laravel/framework/">Laravel</AppLink> and more.
              Check out my <AppLink class="inline-block" :to="SOCIALS.github">
                <Icon name="mdi:github" class="mb-1 -mr-0.5" /> GitHub profile
              </AppLink> for more information and consider <AppLink to="/sponsors">supporting me</AppLink>.
            </p>
          </div>
        </div>
        <div class="hidden sticky bottom-0 lg:block">
          <NuxtPicture width="608" height="931" format="avif,webp,png" densities="x1 x2" placeholder :img-attrs="{ class: 'z-20 ml-24 -mb-24' }"
            src="/img/alex-fingers-to-the-left-showing.png" alt="" aria-hidden />
        </div>
      </div>
    </AppSection>
  </div>
</template>
