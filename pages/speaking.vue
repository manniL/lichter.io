<template>
  <div class="bg-gray-300 px-4 py-16">
    <div class="container mx-auto">
      <h1 class="text-2xl font-bold text-center">
        Speaking - My past and upcoming talks
      </h1>
      <p class="mt-16 max-w-4xl mx-auto">
        Speaking was always fun and exciting for me. Already during my school time I was often on stage.
        Nowadays I have the pleasure to speak at international conferences, medium-to-large sized companies but also at
        local meetups.
        If you think I'd be a good fit for your event, feel free to
        <a
          class="text-gray-900 font-bold hover:text-black underline"
          href="mailto:inquiry@lichter.io?subject=Speaking%20Opportunity&body=Hey%20Alex!%0D%0AI%20think%20you'd%20be%20a%20great%20fit%20for%20our%20......."
        >contact me</a>! No matter if it is a conference, a user group meeting, an internal event of your company or
        similar.
      </p>
      <section class="flex flex-col my-16">
        <Talk
          v-for="talk in $options.talks"
          :key="talk.title + talk.date"
          :talk="talk"
        />
      </section>
    </div>
  </div>
</template>

<script>

const TALKS = [
  {
    title: 'Nuxt.js and the Composition API',
    description: 'Vue 3 and the Composition API are out for a bit now. And while the ecosystem is catching up, more and more libraries provide support for the Composition API through composables. But what is about Server-Side Rendering with the composition API, especially when using Nuxt.js? I got you covered! In this talk, you will learn about the @nuxtjs/composition-api package that provides you a couple of nifty composables as well as SSR support in conjunction with the Composition API itself. Together we look into the new additions of the packages as well as several use cases and examples of how to use the Composition API with Nuxt.js.',
    eventName: 'Fullstack NL',
    location: 'Online',
    eventUrl: 'https://www.meetup.com/full-stack-nl/events/274529321/',
    date: '2020-12-10'
  },
  {
    title: '[GER] Nuxt.js für Einsteiger',
    description: `Nuxt.js ist ein Framework zum Erstellen von Vue.js Anwendungen. Dabei wird das Entwicklerleben durch Nuxt erheblich erleichtert!
Das Framework bietet Funktionen wie Server Side Rendering, Static Site Generation und automatisches Code-Splitting, um sicherzustellen, dass euer zukünftiges Frontend production-ready und leistungsstark ist.
In diesem Workshop werden wir gemeinsam mit Nuxt.js eine App entwickeln und den Prozess von der Erstellung des Projekts bis zum endgültigen Einsatz begleiten. Währenddessen werden wir einen Blick auf viele Funktionen werfen, die Nuxt.js bietet. Dabei werden auch häufige Fallstricke und Techniken zur vermeidung dieser gezeigt.
Zur Teilnahme werden lediglich Vue.js-Grundkenntnisse benötigt. Ihr müsst kein Vue-Profi sein um teilnehmen zu können!`,
    eventName: 'Developer Open Space 2020',
    location: 'Online',
    eventUrl: 'https://devopenspace.de/',
    date: '2020-12-04',
    isWorkshop: true
  },

  {
    title: 'Nuxt.js and the Composition API',
    description: 'Vue 3 and the Composition API are out for a bit now. And while the ecosystem is catching up, more and more libraries provide support for the Composition API through composables. But what is about Server-Side Rendering with the composition API, especially when using Nuxt.js? I got you covered! In this talk, you will learn about the @nuxtjs/composition-api package that provides you a couple of nifty composables as well as SSR support in conjunction with the Composition API itself. Together we look into the new additions of the packages as well as several use cases and examples of how to use the Composition API with Nuxt.js.',
    eventName: 'Vue.js fwdays\'20',
    location: 'Online',
    eventUrl: 'https://fwdays.com/en/event/vuejs-conf-2020/review/nuxt-js-and-the-composition-api',
    slidesUrl: 'https://slides.com/mannil/nuxtjs-and-the-composition-api-fwdays-2020/',
    date: '2020-11-28'
  },
  {
    title: 'SEO in a Vue.js world',
    description: 'What do a SaaS landing page, blog and e-commerce store have in common? They should all be found through a search engine, ideally by as many people as possible. Search engine optimization (SEO) can therefore be decisive for the success and also the revenue of your projects. But when it comes to Vue.js and SEO, there are many controversial opinions about the impact of Vue on SEO efforts. In my session we will go through the basics of SEO and examine best practices and their implementations with the help of vue-meta and Nuxt.js.',
    eventName: 'vue-leipzig',
    location: 'Online',
    eventUrl: 'https://www.meetup.com/Vue-js-Meetup-Leipzig/events/273226548/',
    slidesUrl: 'https://slides.com/mannil/seo-in-a-vue-js-world-vue-leipzig-2020/',
    videoUrl: 'https://www.youtube.com/watch?v=5J_N1AgR7tM',
    date: '2020-10-21'
  },
  {
    title: 'Nuxt.js - The Beginner Workshop',
    description: 'Nuxt.js is an app-level framework for building Vue.js applications that will make a developer\'s life easier. The framework offers features like Server Side Rendering, Static Site Generation and automatic code splitting to make sure your front-end is production-ready and has great performance. In this workshop, we will develop a near-real-life app with Nuxt.js together, from creating the project to the final deployment. During this process we will take a look at many features Nuxt.js offers and also show common pitfalls and how to avoid them.',
    eventName: 'Vueday 2020',
    location: 'Online',
    eventUrl: 'https://2020.vueday.it/workshops/nuxtjs-the-beginners-workshop.html',
    date: '2020-09-21',
    isWorkshop: true
  },
  {
    title: 'SEO in a Vue.js world',
    description: 'What do a SaaS landing page, blog and e-commerce store have in common? They should all be found through a search engine, ideally by as many people as possible. Search engine optimization (SEO) can therefore be decisive for the success and also the revenue of your projects. But when it comes to Vue.js and SEO, there are many controversial opinions about the impact of Vue on SEO efforts. In my session we will go through the basics of SEO and examine best practices and their implementations with the help of vue-meta and Nuxt.js.',
    eventName: 'Vue Global 2020',
    location: 'Online',
    eventUrl: 'https://vuejs.amsterdam/',
    slidesUrl: 'https://slides.com/mannil/seo-in-a-vue-js-world-vue-global-2020/',
    videoUrl: 'https://www.youtube.com/watch?v=MGvtkh2asv4',
    date: '2020-09-17'
  },
  {
    title: 'SEO in a Vue.js world',
    description: 'What do a SaaS landing page, blog and e-commerce store have in common? They should all be found through a search engine, ideally by as many people as possible. Search engine optimization (SEO) can therefore be decisive for the success and also the revenue of your projects. But when it comes to Vue.js and SEO, there are many controversial opinions about the impact of Vue on SEO efforts. In my session we will go through the basics of SEO and examine best practices and their implementations with the help of vue-meta and Nuxt.js.',
    eventName: 'vueday 2020',
    location: 'Online',
    eventUrl: 'https://2020.vueday.it/',
    slidesUrl: 'https://slides.com/mannil/seo-in-a-nuxt-js-world-vueday-2020/',
    date: '2020-09-15'
  },
  {
    title: 'SEO in a Vue.js world',
    description: `There is an incredible amount of search engine requests every day. And all the people searching want to find
    the best content for them, not matter if that's an article, a new product or an answer to a question. So no matter if you have
    an e-commerce platform, a blog or a niche-site - you want to be found through engines like Google or Bing.
    Search engine optimization (SEO) can therefore be decisive for the success and also the revenue of your projects.
    When we are reading about Vue.js and SEO though, there are many controversial opinions about the impact of an SPA framework on the SEO efforts.
    In my talk we will go through the basics of SEO and examine best practices and their implementations with the help of vue-meta and Nuxt.js.`,
    eventName: 'MallorcaJS',
    location: 'Online',
    slidesUrl: 'https://slides.com/mannil/seo-in-a-vue-js-world-mallorcajs-2020/',
    videoUrl: 'https://youtu.be/jxUHiSSXE18?t=3184',
    eventUrl: 'https://www.meetup.com/MallorcaJS/events/270156286/',
    date: '2020-04-22'
  },
  {
    title: 'SEO in a Vue.js world',
    description: `What do a SaaS landing page, blog and e-commerce store have in common? They should all be found
    through a search engine, ideally by as many people as possible. Search engine optimization (SEO) can therefore be
    decisive for the success and also the revenue of your projects. But when it comes to Vue.js and SEO, there are many
    controversial opinions about the impact of Vue on SEO efforts. In my session we will go through the basics of SEO
    and examine best practices and their implementations with the help of vue-meta and Nuxt.js.`,
    eventName: 'VueConf US',
    location: 'Austin, USA',
    eventUrl: 'https://vueconf.us/',
    videoUrl: 'https://www.vuemastery.com/conferences/vueconf-us-2020/seo-in-a-vue-js-world',
    slidesUrl: 'https://slides.com/mannil/seo-in-a-vuejs-world-vueconf-us-2020/',
    date: '2020-03-04'
  },
  {
    title: 'SEO - Basics and proven patterns for modern web applications',
    description: `
      Another spontaneous session on an interesting topic: Search Engine Optimization. Often seen as rocket science
      or witchcraft, SEO is an important part of many businesses and invested work will be often rewarded in the medium
      and long term. With a few basics, you can already improve your search engine visibility and get ahead of
      competitors that don't care about Search Engine Optimization. During the session, I showed a few achievements
      regarding organic traffic, basic steps every web dev can perform to improve their site visibility and proven
      patterns in SEO.
    `,
    eventName: 'VueCamp',
    location: 'Berlin, Germany',
    eventUrl: 'https://vuecamp.de/',
    date: '2019-10-27'
  },
  {
    title: 'A live introduction into Tailwind',
    description: `
      A spontaneous live-coding session about the rising CSS framework Tailwind. During the session we created a demo
      project based on Nuxt.js, included Tailwind and took a look at the utility-first approach as well as different
      features of the framework like component extraction, the style reset for many native elements and easy class composition.
    `,
    eventName: 'VueCamp',
    location: 'Berlin, Germany',
    eventUrl: 'https://vuecamp.de/',
    date: '2019-10-27'
  },
  {
    title: 'Nuxt.js - AMA',
    description: `
      I thought a lot about what I was going to present at VueCamp. Finally, I decided on something that fits well with
      the spirit of a barcamp: Talking with the people, not only to the people. And nothing fits better than an AMA here!
      So, I'm curious about your exciting questions regarding the Nuxt ecosystem, the core and (almost) everything else
      you want me to tell you.
    `,
    eventName: 'VueCamp',
    location: 'Berlin, Germany',
    eventUrl: 'https://vuecamp.de/',
    slidesUrl: 'https://slides.com/mannil/ama-vuecamp-berlin-2019',
    date: '2019-10-26'
  },
  {
    title: 'JAMstack - A new web app architecture',
    description: `
    JAMStack is interesting, though we will neither talk about the portable guitar amp, nor the stacking of jam.
    Instead, we will explore a new modern approach to develop web applications based on Javascript, APIs and Markup. It promises improved security out of the box, easier scaling and also better performance while the cost will decrease.
    This talk will highlight which promises the new web app architecture can resolve (pun intended)`,
    eventName: 'Webmontag Dresden',
    location: 'Dresden, Germany',
    eventUrl: 'https://www.meetup.com/webmontag-dd/events/262774308/',
    slidesUrl: 'https://slides.com/mannil/jamstack-webmontag-07-19',
    date: '2019-07-22'
  },
  {
    title: 'JAMstack - Eine neuartige Webanwendungs-Architektur (German)',
    description: `
    JAMstack - Früher fand man bei der Suche nach dem Begriff nur einen portablen Gitarrenverstärker. Aber um den geht es natürlich nicht, sondern um eine framework-unabhängige Architektur für moderne Webanwendungen.
    Bestehend aus *J*avascript, *A*PIs und *M*arkup verspricht der Ansatz besser Sicherheit "by default", einfachere Skalierung und auch noch erhöhte Performance bei geringeren Kosten.
    Ob das so einfach geht?`,
    eventName: 'OUTPUT.DD',
    location: 'Dresden, Germany',
    eventUrl: 'https://output-dd.de/blog/project-post/jamstack-eine-moderne-webanwendungs-architektur/',
    slidesUrl: 'https://slides.com/mannil/jamstack-output-dd-2019',
    date: '2019-06-20'
  },
  {
    title: 'Clean Code in Vue.js and Nuxt.js',
    description: 'Clean Code is undoubtfully important. Too much technical debt can slow down projects and, in the end, ruin companies. While the principles themselve are clear thanks to Uncle Bob, this talk lays the focus on Clean Code when working with the frameworks Vue.js and Nuxt.js.',
    eventName: 'Private talk',
    location: 'Undisclosed location',
    date: '2019-06-11'
  },
  {
    title: 'Nuxt.js in the context of modern web development',
    description: 'An introduction talk to fellow developer colleagues explaining the history of web development and digging deeper into modern approaches including SPAs, SSR-Apps and JAMstack, all realised with the Nuxt.js framework.',
    eventName: 'Private talk',
    location: 'Undisclosed location',
    date: '2019-06-11'
  },
  {
    title: 'JAMstack - Eine neuartige Webanwendungs-Architektur (German)',
    description: `
    JAMstack, und damit ist nicht der portablen Gitarrenverstärker den man beim Googlen als erstes findet gemeint, ist eine framework-unabhängige Architektur für moderne Webanwendungen.
    Bestehend aus *J*avascript, *A*PIs und *M*arkup verspricht der Ansatz besser Sicherheit "by default", einfachere Skalierung und auch noch erhöhte Performance.
    Ob das so einfach geht? Findet es in diesem Lightning Talk heraus`,
    eventName: 'DevDay Dresden',
    location: 'Dresden, Germany',
    eventUrl: 'https://www.devday.de/devday19/talk/jamstack-eine-neuartige-webanwendungs-architektur/',
    slidesUrl: 'https://slides.com/mannil/jamstack-dev-day-dresden-2019',
    date: '2019-05-22'
  },
  {
    title: 'Nuxt.js - Why? How? Oh yeah!',
    description: `
    Nuxt.js - You probably have heard the name of the Vue.js framework a few times by now.
    Maybe when a colleague of yours gave it a try, or when you saw it on the GitHub report as the fourth fastest growing open source project in 2018.
    But of course, you as a smart developer are skeptical:
    Why would I need another framework that even sits on top of *another* one?
    What is this trendy "SSR" buzzword?
    Which problems would Nuxt solve for me and how can I get started?
    During the talk I'll answer all of these questions and many more.
    Join the meetup for an introduction to Nuxt.js. There is no further knowledge besides basic Vue experience needed.`,
    eventName: 'VueJS Dresden',
    location: 'Dresden, Germany',
    eventUrl: 'https://www.meetup.com/vue-js-dresden/events/258288987/',
    slidesUrl: 'https://slides.com/mannil/nuxt-dresden-2019',
    date: '2019-04-29'
  },
  {
    title: 'Nuxt.js - Why? How? Oh yeah!',
    description: 'Nuxt.js - You probably have heard the name of the Vue.js framework at least once. Maybe when a fellow colleague gave it a try, or when you saw it on the GitHub report as 4th fastest growing open source project in 2018. But as a smart developer, you\'re skeptical: Why would I need another framework that even sits on top of *another* one? What is this SSR everyone is talking about? What problems would Nuxt solve for me and how to get started? During my talk, all these questions (and many more) will be answered. Join an introduction to Nuxt.js and experience it with no previous knowledge needed besides Vue. ',
    eventName: 'VueDay Verona',
    location: 'Verona, Italy',
    eventUrl: 'https://2019.vueday.it/talks.html',
    videoUrl: 'https://vimeo.com/338836843',
    slidesUrl: 'https://slides.com/mannil/nuxt-verona-2019#/',
    date: '2019-04-12'
  },
  {
    title: 'JAMstack & Vue - An Architecture For Modern Web Applications',
    description: `
    Some of you might have heard of JAMstack already - a new approach to build and deliver web applications.
    In this talk, we will look at the pros and cons of JAMstack and see how Vue and vue-based frameworks like Nuxt.js or Gridsome will help us building performant, small and efficient web sites and web applications.`,
    eventName: 'VueJS Dublin',
    location: 'Dublin, Ireland',
    eventUrl: 'https://www.meetup.com/DublinVueJS/events/258492845/',
    slidesUrl: 'https://slides.com/mannil/jamstack-and-vue',
    date: '2019-02-21'
  },
  {
    title: 'Nuxt.js - An Introduction',
    description: `
    What? A framework on top of a framework? Yes, you heard right!
    Nuxt.js is a Vue.js Meta Framework to create complex, fast & universal web applications quickly.
    Have you ever asked yourself how to improve the search engine ranking of your Vue application?
    Or if there is an easier way to configure Vuex, VueRouter and other common libraries together.
    Join us and learn more about the benefits of Nuxt.js and why you should use it in your next projects.
    Live demo included 😳. PS: No prior Nuxt.js knowledge is needed but basic Vue.js understanding is appreciated.`,
    eventName: 'VueJS Dublin',
    location: 'Dublin, Ireland',
    eventUrl: 'https://www.meetup.com/DublinVueJS/events/256376470/',
    slidesUrl: 'https://slides.com/mannil/nuxt-js-an-introduction#/',
    date: '2018-11-29'
  },
  {
    title: 'No loops needed - Functional programming in PHP',
    description: `
    Functional programming is becoming more popular, even in non-functional programming languages.
    This observation can be seen as approved after even Java added functional paradigms in the form of lambda expressions.
    This lightning talk will highlight the role of functional programming PHP, which similarities FP and Lego have and why loops are (almost?) obsolete in a functional programming world.`,
    eventName: 'PHP Usergroup Dresden',
    location: 'Dresden, Germany',
    eventUrl: 'https://www.meetup.com/PHP-USERGROUP-DRESDEN/events/246306832/',
    slidesUrl: 'https://mannil.github.io/fp-in-php/',
    date: '2018-05-28'
  },
  {
    title: 'PHP is dead - Long live PHP',
    description: `
    PHP - These three letters don't make many people think of anything good.
    But why are so many people averse to this server-side language?
    And how can it be that PHP's market share is at an incredible 81 percent, despite all the aversion?
    Under the headline "PHP is dead - Long live PHP" and in a funny mood we will explore the topic.

    Together with Alexander Lichter we will see how important PHP will be in 2018, it's usefulness when programming applications and what the future looks like for PHP!
    Whether you are a real PHP-hater or a new programmer, this talk will give you some interesting information. And the more people there are, the more fun it'll be.`,
    eventName: 'Information Technology Club Dresden',
    location: 'Dresden, Germany',
    eventUrl: 'https://www.meetup.com/MSP-Dresden/events/246639875/',
    slidesUrl: 'https://mannil.github.io/php-is-dead-long-live-php/',
    date: '2018-02-01'
  },
  {
    title: 'Map, Reduce, Filter - No loops needed',
    description: `
    The popularity of functional programming is without doubt, even in non-functional languages.
    It's rise is underpinned by Java, which now also includes functional paradigms in the language's core.
    This talk is perfect for people who never used map, reduce or filter, or for those who don't know a bit about the mentioned functions.
    I'll give an introduction about a world that works without for-each loops, lives from expressive code and turns some of the common views topsy-turvy.
    Live coding included! No matter if you are new to programming or an OOP-genius, everyone will have something to take away after the talks ;)`,
    eventName: 'Hacken 101 - iFSR TU Dresden',
    location: 'Dresden, Germany',
    eventUrl: 'https://www.ifsr.de/fsr:news:30.01._hacken101_-_map_reduce_filter_-_no_loops_needed',
    slidesUrl: 'https://mannil.github.io/map-reduce-filter-no-loops-needed/#/',
    date: '2018-01-30'
  },
  {
    title: 'PHP is dead - Long live PHP',
    description: `
    PHP - Many people don't think about something positive when reading these three letters.
    But how can it be that many people are averse to this server-side language?
    And why is PHP's market share at an incredible 81 percent despite all the reluctance?
    Under the headline "PHP is dead - Long live PHP" and in a cheerful mood we get to the bottom of all this.
    Together with the long-time PHP developer Alexander Lichter we will find out how important PHP will be in 2017, if you can program excellent applications with it and what the future looks like for PHP!
    Whether you are a PHP-hater or a new programmer, there is something for everyone in this talk. And the more people there are, the more fun it gets.`,
    eventName: 'Hacken 101 - iFSR TU Dresden',
    location: 'Dresden, Germany',
    eventUrl: 'https://www.ifsr.de/fsr:news:05.12._hacken_101_-_php_is_dead.._long_live_php',
    slidesUrl: 'https://mannil.github.io/php-is-dead-long-live-php/',
    date: '2017-12-05'
  }
]

export default {
  components: {
    Talk: () => import('~/components/speaking/Talk')
  },
  talks: TALKS,
  head () {
    const title = 'Speaking - My Talks'
    const metaDescription = 'A list of all talks I\'ve given on conferences, meetups and other events. Slides and video, if available, are linked to each talk.'
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
      ]
    }
  }
}
</script>
