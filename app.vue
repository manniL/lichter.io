<script setup lang="ts">
useAppSeo()
useSiteNotifications()

function useAppSeo() {
  const siteUrl = useSiteConfig().url
  const route = useRoute()

  const canonical = computed(() => {
    const pathWithSlash = route.path.endsWith('/') ? route.path : `${route.path}/`
    return `${siteUrl}${pathWithSlash}`
  })

  const isDark = useDark()
  const favicon = computed(() => `/img/logo/glyph-${isDark.value ? 'white' : 'black'}-colored.svg`)

  useServerHead({
    htmlAttrs: {
      // TODO: Change this for German content
      lang: 'en'
    },
    bodyAttrs: {
      class: 'bg-black antialiased min-h-screen text-white'
    },
  })

  useHead({
    titleTemplate: (c) => c ? `${c} - Alexander Lichter` : 'Alexander Lichter - Web Engineering Consultant',
    link: [
      { rel: 'canonical', href: canonical },
      { rel: 'icon', href: favicon, type: "image/svg+xml" },
    ],
  })

  useSchemaOrg([
    definePerson({
      address: {
        '@type': 'PostalAddress',
        addressCountry: 'NL',
        addressLocality: 'Amsterdam',
        addressRegion: 'Noord Holland',
        postalCode: '1087 JK',
        streetAddress: 'IJburglaan 1024'
      },
      name: 'Alexander Lichter',
      image: '/img/me@2x.jpg',
      email: 'mailto:hello@lichter.io',
      nationality: "German",
      jobTitle: 'Web Engineering Consultant & Managing Director',
      url: 'https://www.lichter.io/',
      sameAs: [
        ...Object.values(SOCIALS),
        'https://stackoverflow.com/users/3975480/mannil',
        'https://www.developmint.de/',
      ]
    }),
    defineWebSite(),
    defineWebPage()
  ])

  useServerSeoMeta({
    author: 'Alexander Lichter',
    ogSiteName: 'www.lichter.io',
    ogType: 'website'
  })

  const styleConfig = {
    hideEventTypeDetails: false,
    layout: "month_view"
  }

  // Cal.com
  // TODO: Defer loading later on but store clicks in the meantime
  useHead({
    script: [
      {
        key: 'cal',
        innerHTML: `
(function (C, A, L) { let p = function (a, ar) { a.q.push(ar); }; let d = C.document; C.Cal = C.Cal || function () { let cal = C.Cal; let ar = arguments; if (!cal.loaded) { cal.ns = {}; cal.q = cal.q || []; d.head.appendChild(d.createElement("script")).src = A; cal.loaded = true; } if (ar[0] === L) { const api = function () { p(api, arguments); }; const namespace = ar[1]; api.q = api.q || []; typeof namespace === "string" ? (cal.ns[namespace] = api) && p(api, ar) : p(cal, ar); return; } p(cal, ar); }; })(window, "https://app.cal.com/embed/embed.js", "init");
Cal("init", {origin:"https://cal.com"});
Cal("ui", ${JSON.stringify(styleConfig)});
`,
      }
    ]
  })
}

function useSiteNotifications() {
  const { addNotification } = useNotifications()

  onMounted(async () => {
    const result = onDicsordRef()
    if (result) {
      await new Promise((resolve) => setTimeout(resolve, 1000))
    }
    onUserSpeaksGerman()
  })

  function onDicsordRef(): Boolean {
    const isDicsordDomain = route.query?.ref === 'dicsord.com'
    if (!isDicsordDomain) {
      return false
    }

    addNotification({
      heading: 'You should double check the URL ;)',
      body: 'Did you want to go to https://discord.com/ instead?'
    })
    return true
  }

  function onUserSpeaksGerman(): Boolean {
    const doesSpeakGerman = navigator.languages.some(lang => lang.startsWith('de'))
    if (!doesSpeakGerman) {
      return false
    }

    const didUserSeeGermanNotificationAlready = localStorage.getItem(LOCALSTORAGE_KEYS.notificationGerman)
    if (didUserSeeGermanNotificationAlready) {
      return false
    }

    addNotification({
      heading: 'Ich spreche auch Deutsch!',
      body: 'Alle Workshops und Talks können auch auf Deutsch gehalten werden.',
      onRemove() {
        localStorage.setItem(LOCALSTORAGE_KEYS.notificationGerman, 'true')
      }
    })

    return true
  }
}
</script>

<template>
  <div>
    <AppNavbar />
    <div class="mt-8">
      <NuxtPage />
    </div>
    <!-- Gradient "hack" for icons -->
    <svg style="width:0;height:0;position:absolute;" aria-hidden="true" focusable="false">
      <linearGradient id="gradient-svg-icon" x2="1" y2="1">
        <stop offset="0" style="stop-color:#F20500" />
        <stop offset="2.272730e-04" style="stop-color:#F20500" />
        <stop offset="1" style="stop-color:#D90575" />
      </linearGradient>
    </svg>
    <LazyAppFooter />
    <LazyAppNotificationArea />
  </div>
</template>

<style lang="pcss">
::selection {
  @apply bg-red-500/25;
}

/* TODO: Move to ProseCode component? */
.line {
  display: inline-table;
  @apply -mx-8 px-8;
}

.line.highlight {
  @apply bg-white/5;
}
</style>