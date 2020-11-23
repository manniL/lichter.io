<template>
  <div class="bg-gray-200 px-4 py-16">
    <section class="flex flex-col justify-center items-center flex-wrap">
      <h1 class="text-2xl font-bold text-center">
        Your support is powerful!
      </h1>
      <div class="flex flex-col md:flex-row justify-around items-center w-5/6 md:w-2/3 mx-auto mt-16">
        <div class="flex-1 text-center">
          <div class="flex flex-col items-center">
            <img
              alt="Alexander Lichter"
              class="rounded-full border border-gray-600 shadow-2xl mb-2 w-64 h-64"
              src="/img/me.jpg"
              srcset="/img/me@2x.jpg 2x"
            >
            <p class="mt-4 font-light text-lg md:text-2xl">
              Alexander Lichter
            </p>
          </div>
          <VueNextLevelScroll target="#donate">
            <button class="mt-12 bg-green-500 hover:bg-green-400 px-8 py-4 rounded-full text-white text-2xl shadow-lg border border-green-300">
              Donate 🙏
            </button>
          </VueNextLevelScroll>
        </div>
        <div class="flex-1">
          <p class="mt-6 text-lg">
            👋 Hey! I am Alex, a freelance web developer and
            <a
              class="text-green-700 hover:underline"
              href="https://github.com/nuxt/nuxt.js#core-team"
              rel="noreferrer noopener"
              target="_blank"
              v-text="'Nuxt.js'"
            />
            core team member. But since you're on this page, you probably already know this.
          </p>
          <p class="mt-6 text-lg">
            My goal is to contribute as much as possible to the Nuxt.js ecosystem.
            Currently, I am helping developers on a daily basis in the Discord, on GitHub and on
            <a
              class="text-blue-400 hover:underline"
              href="http://twitter.com/TheAlexLichter"
              rel="noreferrer noopener"
              target="_blank"
              v-text="'Twitter'"
            />, writing <a
              class="underline hover:no-underline"
              href="https://blog.lichter.io/?ref=thanks.lichter.io"
              rel="noopener"
              target="_blank"
              v-text="'blog posts'"
            /> and guides about programming topics and maintaining several packages.
          </p>
          <p class="mt-6 text-lg">
            Besides working on the Nuxt.js core, I've created a hand full of modules to make the developer's lives
            easier:
          </p>

          <ul class="mt-4 text-lg list-disc pl-10">
            <li>
              <a
                class="github-link"
                href="https://github.com/nuxt-community/redirect-module"
                rel="noreferrer noopener"
                target="_blank"
                v-text="'@nuxtjs/redirect-module'"
              /> - Redirect old URLs to keep SEO up
            </li>
            <li>
              <a
                class="github-link"
                href="https://github.com/nuxt-community/feed-module"
                rel="noreferrer noopener"
                target="_blank"
                v-text="'@nuxtjs/feed-module'"
              /> - Blog feeds for everyone!
            </li>
            <li>
              <a
                class="github-link"
                href="https://github.com/nuxt-community/separate-env-module/"
                rel="noreferrer noopener"
                target="_blank"
                v-text="'@nuxtjs/separate-env-module'"
              /> - Separate env values into server/client ones
            </li>
            <li>
              <a
                class="github-link"
                href="https://github.com/Developmint/nuxt-svg-loader"
                rel="noreferrer noopener"
                target="_blank"
                v-text="'nuxt-svg-loader'"
              /> - Load SVGs as you'd load Vue components
            </li>
            <li>
              <a
                class="github-link"
                href="https://github.com/Developmint/nuxt-purgecss"
                rel="noreferrer noopener"
                target="_blank"
                v-text="'nuxt-purgecss'"
              /> - Delete superfluous CSS
            </li>
            <li>
              You can find more on my
              <a
                class="github-link"
                href="https://github.com/manniL"
                rel="noreferrer noopener"
                target="_blank"
                v-text="'own GitHub'"
              /> and
              <a
                class="github-link"
                href="https://github.com/Developmint"
                rel="noreferrer noopener"
                target="_blank"
                v-text="'company GitHub'"
              /> profile
            </li>
          </ul>

          <p class="mt-6 text-lg">
            I'm doing all of this in my <span class="font-bold" v-text="'free time'" />!
            But I'd love to work on all these awesome
            things <span class="font-bold" v-text="'full time'" /> one day.
          </p>
        </div>
      </div>
      <h2
        id="say-thanks"
        class="text-center text-3xl md:text-4xl mt-8 py-10"
      >
        Say thanks
      </h2>
      <div class="flex justify-around items-center w-5/6 md:w-2/3 mx-auto text-center">
        <div class="flex-1 text-left">
          <p class="mt-6 text-xl">
            I very much appreciate kind words or a simple <span class="text-black" v-text="'thank you'" />!
            This is what keeps me motivated (even on a bad Monday). Same goes for sharing my content or starring one of
            my creations.
            <br><br>
            Unfortunately, I have to make a living somehow as well. On the one hand, I am offering Nuxt.js consulting
            through my company Developmint. However, if you know a company that needs help, code reviews, feedback, best
            practices or an external audit, feel free to pass my website along so they can
            <span class="font-bold" v-text="'hire me'" />!
            <br>
            But as you probably can imagine the income is somewhat unsteady and unreliable&#8230;
          </p>
        </div>
      </div>
      <h2 id="donate" class="text-center text-3xl md:text-4xl mt-8 py-10">
        Support me
      </h2>
      <div class="flex flex-col justify-around items-center w-5/6 md:w-2/3 mx-auto text-center">
        <div class="flex-1 text-left">
          <p class="mt-6 text-xl">
            If you think my community work and effort is worth a small donation, then here comes the opportunity!<br>
            <span class="font-bold">
              Every donation, no matter how small
            </span> helps me to
            cover the bills and to invest
            more time into open-source,
            the Nuxt ecosystem and helping out people.
          </p>
          <div>
            <h3 class="text-center text-3xl mt-8">
              Recurring Donations
            </h3>
            <p class="text-xl mt-16">
              For recurring donations, please use my
              <a class="font-bold text-2xl github-link" href="https://github.com/users/manniL/sponsorship" target="_blank" rel="noopener">GitHub Sponsorship profile</a>.
            </p>
          </div>
          <div class="mt-16">
            <h3 class="text-center text-3xl mt-8 mb-16">
              One Time Donations
            </h3>
            <VueNextLevelScroll
              v-for="(item, i) in $options.donationItems"
              :key="i"
              target="#donationform"
            >
              <DonationItem
                v-bind="item"
                @click.native="changeDonationType(item)"
              />
            </VueNextLevelScroll>
          </div>
        </div>
      </div>
      <div class="flex py-8 flex-col justify-around items-center w-5/6 md:w-2/3 mx-auto text-center">
        <DonationForm v-if="isStripeLoaded" :donation-type="donationType" @completed="showThanks = true" />
      </div>
      <div
        v-if="showThanks"
        class="flex flex-col py-8 justify-around items-center w-5/6 md:w-2/3 mx-auto text-center md:mt-8 bg-white shadow-inner"
      >
        <p class="text-lg">
          <span class="font-bold text-4xl">
            Thank you for your Donation!
          </span><br>
          People like you help the open-source community to stay alive and grow 😍
        </p>
      </div>
      <div class="flex flex-col py-8 justify-around items-center w-5/6 md:w-2/3 mx-auto text-center md:mt-8">
        <div class="mb-8">
          <h3 class="text-center text-3xl md:text-4xl pt-16">
            Don't own a credit card?
          </h3>
          <p class="text-gray-700">
            Supporting me via Wire Transfer is also possible!
          </p>
        </div>
        <div class="flex flex-col font-mono md:w-1/3 flex-no-shrink pt-8">
          <div
            v-for="([k,v]) in $options.bankDetails"
            :key="k"
            class="flex my-2 md:my-0"
          >
            <div class="w-1/3 text-left" v-text="k" />
            <div class="w-2/3 text-right" v-text="v" />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  components: {
    VueNextLevelScroll: () => import('vue-next-level-scroll'),
    DonationItem: () => import('~/components/thanks/DonationItem'),
    DonationForm: () => import('~/components/thanks/DonationForm')
  },
  data () {
    return {
      donationType: {
        slug: 'none',
        price: -1
      },
      showThanks: false,
      isStripeLoaded: false
    }
  },
  head () {
    const title = 'Support me!'
    const metaDescription = 'Your support is powerful. Please consider supporting me to allow me spending more time on the Nuxt ecosystem.'

    return {
      title,
      meta: [
        {
          hid: 'og:title',
          name: 'og:title',
          content: title
        },
        {
          hid: 'description',
          name: 'description',
          content: metaDescription
        },
        {
          hid: 'og:description',
          name: 'og:description',
          content: metaDescription
        }
      ],
      script: [
        { hid: 'stripe', src: 'https://js.stripe.com/v3/', defer: true, callback: () => { this.isStripeLoaded = true } }
      ]
    }
  },
  methods: {
    changeDonationType (type) {
      this.donationType = type
    }
  },
  donationItems: [
    {
      name: 'Public transport ticket',
      slug: 'ticket',
      description: 'Public transport isn\'t cheap in Germany, but it is still cheaper than driving by car and additionally paying for the parking lot',
      price: 261
    },
    {
      name: 'Fund one of my domains for a year',
      slug: 'domain',
      description: 'Domain registration is cheap... if you only have one. But who has only one domain and not like.. fifty? (No I am not addicted!)',
      price: 666
    },
    {
      name: 'Seven bottles of my favorite local soft drink',
      slug: 'kolle',
      description: 'That drink is called Kolle Mate and is locally produced in Dresden, Germany. It has caffeine included and is extremely delicious!',
      price: 1050
    },
    {
      name: 'Two months of Spotify Premium',
      slug: 'spotify',
      description: 'Honestly, I could not live without music! Listening to it while programming makes me way more productive, believe it or not!',
      price: 1998
    },
    {
      name: 'A bottle of 10 year old Talisker Scotch',
      slug: 'talisker',
      description: 'After releasing a new version or finishing a large piece of content I like to celebrate the achievement with a fine glass of Scotch',
      price: 3399
    },
    {
      name: 'Whatever you think is right',
      slug: 'questionmark',
      description: 'You are the one who wants to support me, so you are the one that selects the amount in the end!',
      price: -1
    }
  ],
  bankDetails: [
    ['Name', 'Alexander Lichter'],
    ['Subject', 'Lichter.io Donation'],
    ['Bank', 'Deutsche Kreditbank'],
    ['IBAN', 'DE80 1203 0000 1036 7634 05'],
    ['SWIFT / BIC', 'BYLADEM1001']
  ]
}
</script>

<style scoped>
  .github-link {
    @apply text-indigo-500;
    &:hover {
      @apply underline;
    }
  }
</style>
