<template>
  <div class="bg-gray-200 px-4 py-16">
    <section class="flex flex-col justify-center items-center flex-wrap">
      <h1 class="text-4xl font-bold text-center">
        Things I Use
      </h1>
      <div class="container mx-auto mt-8 text-lg">
        <div v-for="({name, text, subCategories, items}) in content" :key="name">
          <h2 class="text-3xl mt-8">
            {{ name }}
          </h2>
          <div>
            <p class="mt-4 text-gray-800">
              {{ text }}
            </p>
            <div v-for="({name, text, link, isAffiliate = true }) in items" :key="name">
              <h3 class="text-xl mt-8">
                <a
                  :href="link"
                  :rel="`noopener noreferrer ${isAffiliate ? 'sponsored' : ''}`"
                  class="border-b pb-1 border-red-700 hover:border-red-400 inline-block"
                >{{ name }}</a><sup
                  v-if="!isAffiliate"
                  class="text-sm"
                  v-text="'*'"
                />
              </h3>
              <p class="mt-4 text-gray-800">
                {{ text }}
              </p>
            </div>

            <div v-for="({name, text, items}) in subCategories" :key="name">
              <h3 class="text-3xl mt-8">
                {{ name }}
              </h3>
              <p>{{ text }}</p>
              <div v-for="({name, text, link, isAffiliate = true }) in items" :key="name">
                <h4 class="text-xl mt-8">
                  <a
                    :href="link"
                    :rel="`noopener noreferrer ${isAffiliate ? 'sponsored' : ''}`"
                    class="border-b pb-1 border-red-700 hover:border-red-400 inline-block"
                  >{{ name }}</a><sup
                    v-if="isAffiliate"
                    class="text-sm"
                    v-text="'*'"
                  />
                </h4>
                <p class="mt-4 text-gray-800">
                  {{ text }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
const content = [
  {
    name: 'Hardware',
    text: '',
    subCategories: [
      {
        name: 'Laptop',
        text: '',
        items: [
          {
            name: 'MacBook Pro (16-inch, 2019)',
            link: 'https://www.apple.com/shop/buy-mac/macbook-pro',
            text: `After using Windows in the early days and switching to Linux as developer OS, I recently made the jump to macOS and a fresh MacBook.
        So far, I am extremely convinced by the product and already got used to the shortcuts, features and convenience. Not cheap at all but all-in-all, worth it.
        The specs are: 2.4GHz i9, 32GB RAM, AMD Radeon 5500M 8GB and a 1TB SSD.`,
            isAffiliate: false
          },
          {
            name: 'VAVA 8-in-1 USB C Hub',
            link: 'https://www.amazon.com/USB-Hub-Adapter-Ethernet-Charging/dp/B07QQ11BP6/ref=sr_1_3?keywords=VAVA+USB+C+Hub+8-in-1&qid=1581880317&sr=8-3',
            text: '4K HDMI, 1Gbps RJ45 Ethernet Port, 2x USB 3.0, SD/TF Card Reader, 100W PD Charging Port, 1x USB 2.0'
          },
          {
            name: 'BEBONCOOL Wireless Presenter Remote',
            link: 'https://www.amazon.com/BEBONCOOL-Wireless-Presenter-PowerPoint-Presentation/dp/B00Y07DNLM/ref=sr_1_3?keywords=Presenter&qid=1581880224&sr=8-3&th=1',
            text: 'Cheap, works fine with mac, eaz pz' // TODO
          },
          {
            name: 'AmazonBasics 15.6-Inch Laptop Sleeve - Black',
            link: 'https://www.amazon.de/dp/B00CD8AFT8/ref=sr_1_7?crid=3L06ITRPTBBS8&keywords=amazon%2Bbasic%2Blaptop&qid=1581812060&sprefix=amazon%2Bbasic%2Blapt%2Caps%2C165&sr=8-7&th=1',
            text: 'TODO (too big)' // TODO
          }
        ]
      },
      {
        name: 'Everydays',
        text: '',
        items: [
          { name: 'iPhone XR', link: '', text: '', isAffiliate: false },
          { name: 'Apple Watch Series 5', link: '', text: '', isAffiliate: false },
          { name: 'Sony WH-1000XM3', link: '', text: '' }
        ]
      },
      {
        name: 'Desktop PC',
        text: '',
        items: [
          { name: '', link: '', text: '' }
        ]
      },
      {
        name: 'Home Equipment',
        text: '',
        items: [
          { name: '', link: '', text: '' },
          { name: '', link: '', text: '' },
          { name: '', link: '', text: '' },
          { name: '', link: '', text: '' },
          { name: '', link: '', text: '' }
          /*
           TODO
           NAS https://www.amazon.de/dp/B072WCDBVW/ref=psdc_430138031_t1_B072WDTB7L
           Festplatten 2x https://www.amazon.de/dp/B00EHBERSE/ref=sr_1_4?keywords=WD40EFRX&qid=1581811476&s=computers&sr=1-4
           Projector https://www.amazon.de/dp/B009JM2K5I/ref=sr_1_4?keywords=Panasonic+PT-AT6000E&qid=1581811526&s=computers&sr=8-4
           Canvas Screen https://www.amazon.de/gp/product/B00FRBYGDE/ref=ppx_yo_dt_b_search_asin_title?ie=UTF8&psc=1
           Wireless Keyboard https://www.amazon.de/gp/product/B07S2RJRH3/ref=ppx_yo_dt_b_asin_title_o06_s00?ie=UTF8&psc=1
          */
        ]
      }
    ]
  },
  {
    name: 'Software',
    text: '',
    subCategories: [
      {
        name: 'Editor & Terminal',
        text: '',
        items: [
          { name: '', link: '', text: '' }
          // TODO: WebStorm, iTerm2, zsh + powerline10k + agnoster + list of plugins here
        ]
      },
      {
        name: 'Productivity & Convenience',
        text: '',
        items: [
          {
            name: 'Alfred',
            link: 'https://www.alfredapp.com/',
            text: '', // TODO: Workflows
            isAffiliate: false
          },
          { name: 'Firefox', link: 'https://www.mozilla.org/en-US/firefox/new/', text: '', isAffiliate: false },
          { name: 'Tweetdeck', link: 'https://tweetdeck.twitter.com/', text: '', isAffiliate: false },
          { name: 'Itsycal', link: 'https://www.mowglii.com/itsycal/', text: '', isAffiliate: false },
          { name: 'Nextcloud', link: 'https://nextcloud.com/', text: '', isAffiliate: false },
          { name: 'Spotify', link: 'https://www.spotify.com/', text: '', isAffiliate: false },
          { name: 'TextMate', link: 'https://macromates.com/', text: '', isAffiliate: false },
          { name: 'Rocket', link: 'https://matthewpalmer.net/rocket/', text: '', isAffiliate: false },
          { name: 'Notion', link: 'https://www.notion.so/?r=28cb091dbd7d46e7967159f3976f1a58', text: '' },
          { name: 'Microsoft Office Suite', link: 'https://www.office.com/', text: '', isAffiliate: false },
          { name: 'MoneyMoneyApp', link: 'https://moneymoney-app.com/', text: '', isAffiliate: false },
          { name: 'Rectangle', link: 'https://rectangleapp.com/', text: '', isAffiliate: false },
          {
            name: 'Amphetamine',
            link: 'https://apps.apple.com/us/app/amphetamine/id937984704',
            text: '',
            isAffiliate: false
          },
          { name: 'Jumpcut', link: 'https://snark.github.io/jumpcut/', text: '', isAffiliate: false },
          { name: 'LastPass', link: ' https://lastpass.com/f?74512738 ', text: '' },
          { name: 'Vanilla', link: 'https://matthewpalmer.net/vanilla/', text: '', isAffiliate: false },
          { name: 'Yoink', link: 'https://eternalstorms.at/yoink/', text: '', isAffiliate: false },
          { name: 'FileZilla', link: 'https://filezilla-project.org/', text: '', isAffiliate: false }
        ]
      },
      {
        name: 'iOS and watchOS highlights',
        text: '',
        items: [
          { name: '', link: '', text: '' }
          /*
           * TODO
           * Strong
           * MyFitnessPal
           * AutoSleep
           * BeerWithMe
           */
        ]
      }
    ]
  },
  {
    name: 'Hosting',
    text: '',
    items: [
      { name: 'Netcup', link: '', text: '' },
      { name: 'Hetzner', link: '', text: '' }
    ]
  }
]

export default {
  setup () {
    return {
      content
    }
  },
  head () {
    const title = 'The things I use'
    const metaDescription = 'TODO'

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
        // TODO Amzn OneLink
        // { hid: 'stripe', src: 'https://js.stripe.com/v3/', defer: true, callback: () => { this.isStripeLoaded = true } }
      ]
    }
  }
}
</script>
