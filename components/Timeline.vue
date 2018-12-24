<template>
  <section class="container mx-auto pt-8">
    <div class="w-5/6 sm:w-2/3 mx-auto">
      <h2 class="text-center mb-8 mt-0 underline">My Timeline</h2>
      <ul class="timeline timeline-centered">
        <timeline-item
          :period="true"
          when="September 2018"
          title="Joined the Nuxt.js Core Team">
          Since the beginning of 2018, Nuxt.js was my framework of choice to fulfill a variety of tasks. After getting
          in touch with the community, I couldn't let it go! Contributing meaningful parts to such an awesome and large
          project felt great. Over time I dug into the internals of Nuxt and got used to the code base, also thanks to
          the other core maintainers. At VueJs London, where I met the Chopin brothers, who are the originators of Nuxt,
          the first time, they surprisingly announced two new core team members. I was one of them.
        </timeline-item>
        <timeline-item
          when="August 2018"
          title="Created my own blog">
          That was a long term goal I had. Building my own blog system with the tools I use in daily work
          and finally write about interesting technical stuff (and maybe other topics as well)!
          After working towards this goal (when I had time) for half a year, I eventually launched the
          blog. On
          <a
            href="https://blog.lichter.io/?ref=lichter.io-tl"
            class="text-grey-darker hover:text-grey"
            rel="noopener"
            target="_blank">blog.Lichter.io</a>
          you can find posts about Javascript, PHP, Nuxt.js, Vue.js, Laravel, meta-topics (related to programming) and
          many other subjects! I highly recommend to check it out.<br><br>
          <b>Used Technologies</b><br>
          Nuxt.js, Tailwind, Laravel
        </timeline-item>
        <timeline-item
          when="December 2017"
          title="Held my first talk">
          After talking with a lot of people about my choice of programming languages, I decided to work on a
          talk about PHP, it's flaws and advantages, as well as the upcoming future of the language.<br>
          I named it "<span class="font-semibold text-indigo-dark">PHP is dead - Long live PHP!</span>".
          If you want to take a look, here are the
          <a
            href="https://mannil.github.io/php-is-dead-long-live-php/"
            class="text-grey-darker hover:text-grey"
            rel="noreferrer noopener"
            target="_blank">slides</a>!<br><br>
          <b>Used Technologies</b><br>
          Tailwind, Webpack, Reveal.js
        </timeline-item>
        <timeline-item
          when="November 2017"
          title="Release of Lichter.io">
          Before applying to companies all over the world for my upcoming semester abroad in 2018, I wanted to
          have a unique way of displaying my CV. So why not creating an adapted version online?
          <br><br>
          <b>Used Technologies</b><br>
          Vue.js, Tailwind, SCSS, Webpack
        </timeline-item>
        <timeline-item
          when="October 2017"
          title="Contribution to Laravel">
          Yeah, I
          <a
            href="https://github.com/laravel/framework/pull/21745"
            class="text-grey-darker hover:text-grey"
            rel="noreferrer noopener"
            target="_blank"
          >did it</a>!
          After using Laravel for quite a while in almost all my company and
          side projects, I finally
          contributed to the well-known PHP framework.
        </timeline-item>
        <timeline-item
          when="October 2016"
          title="Internship at ITC AG">
          As part of my study, a group of four students (including me) had the chance to work on a project
          contracted by ITC AG. The task was to create a converter for measured data of various formats as a
          full-stack web app.
          <br><br>
          <b>Used Technologies</b><br>
          Java (Spring), SQL, jQuery, Git
        </timeline-item>
        <timeline-item
          when="October 2015"
          title="Started studying CS at the TU Dresden">
          Without a big break, I applied for the Diploma Computer Science course at the TU Dresden, moved
          there and started to study.
        </timeline-item>
        <timeline-item
          :period="true"
          when="August 2015"
          title="Founded Developmint">
          Not even a month after finishing my Abitur, I founded my own company together with two friends.
          <a
            href="https://developmint.de"
            class="developmint"
            target="_blank"
            rel="noreferrer noopener">Developmint</a>
          <small class="text-xs text-grey-darkest"> (fancy, eh?)</small>
          fulfills contract work for mid-sized businesses as well as single persons. Our core competencies are
          web apps, websites and MacOS/iOS apps. We have done a range of work by now, ranging from simple but
          good-looking portfolio pages to complex
          business tools.<br><br>
          <strong>Interested?</strong>
          <a
            class="text-grey-darkest hover:text-black"
            href="mailto:inquiry@lichter.io?subject=Inquiry&body=Hey%20Alex!%0D%0AI've%20seen%20your%20website%20and%20would%20like%20to%20talk%20to%20you%20about%20......."
          >Drop me a line!</a><span class="no-underline"> 😉</span>
        </timeline-item>
        <timeline-item
          when="July 2015"
          title="Graduated school - Abitur (1,9)">
          In 2015 I finished school and did my Abitur (the German A-Levels) at the
          <em>Europäisches Gymnasium Waldenburg</em> with a final grade of <strong>1.9</strong>
        </timeline-item>
        <timeline-item
          when="December 2014"
          title="Received Cambridge certificate">
          After spending time abroad in Dublin and Kent (UK), I took my <em>Cambridge: Advanced English</em>
          certificate, which is targeted at CEFR Level C1.
        </timeline-item>
        <timeline-item
          when="November 11, 2011"
          title="First internship">
          In the 9th grade, we had to fulfill a work experience at a company of our choice. Of course,
          we must apply for that internship regularly. I first thought of working at a computer repair company
          to gain knowledge about the hardware, but then I applied at a smaller software company in
          my town and they accepted my application!
          <br><br>
          My first task was testing their current system and trying to break it. After reporting the
          found bugs and caveats they noticed that my understanding was quite good for a 15-year-old guy,
          so the follow-up tasks were more complex and deep, like creating configs and setting up
          the database.
          <br><br>
          <b>Used Technologies</b><br>
          Redmine, MySQL, YAML, PHP (Symfony)
        </timeline-item>
        <timeline-item
          when="1999"
          title="Used a computer the first time">
          Yeah, that's no joke! I played a Mario clone on my grandpa's PC.
        </timeline-item>
        <timeline-item
          :period="true"
          when="1996"
          title="I was born 🤰🏼👶🏼"/>
      </ul>
    </div>
  </section>
</template>

<script>
import TimelineItem from '~/components/TimelineItem.vue'

export default {
  name: 'Timeline',
  components: { TimelineItem }
}
</script>

<style lang="scss">
  .timeline {
    @apply .list-reset .w-full .text-grey-dark;

    line-height: 1.4em;
    h1, h2, h3, h4, h5, h6 {
      @apply .text-black;
      line-height: inherit;
    }
  }

  .timeline-item {
    @apply .relative .pl-8;
    &:last-child {
      @apply pb-0;
    }
  }

  .timeline-info {
    @apply .mb-2 .font-bold .text-xs .tracking-wide .uppercase .whitespace-no-wrap;
  }

  .timeline-marker {
    @apply .absolute .pin-y .pin-l .w-8;

    &:before {
      @apply .absolute .pin-l .block .h-4 .w-4 .bg-grey;
      content: "";
      top: 4px;
      transition: background 0.2s ease-in-out;
    }
    &:after {
      @apply .absolute .pin-b .block .bg-grey;
      content: "";

      width: 3px;

      top: 24px;
      left: 6px;
    }
    .timeline-item:last-child &:after {
      content: none;
    }
  }

  .timeline-item:not(.period):hover .timeline-marker:before {
    @apply .bg-red-light;
  }

  .timeline-content {
    padding-bottom: 40px;
    p:last-child {
      @apply .mb-0;
    }
  }

  .timeline-item:not(.period):hover .timeline-info,
  .timeline-item:not(.period):hover .timeline-content {
    @apply .text-grey-darkest;
  }

  .timeline-split {
    @screen sm {
      .timeline {
        @apply .table;
      }

      .timeline-item {
        @apply .table-row .p-0;
      }

      .timeline-info,
      .timeline-marker,
      .period .timeline-info {
        @apply .table-cell .align-top;
      }

      .timeline-marker {
        @apply .relative;
      }

      .timeline-content {
        @apply .block .m-0 .p-0 .mt-4 .mb-4;
        padding-left: 30px;
      }

      .timeline-info {
        padding-right: 30px;
      }

      .period .timeline-title {
        @apply .relative;
        left: -45px;
      }
    }
  }

  .timeline-centered {
    @extend .timeline-split;
    @screen md {
      &,
      .timeline-item,
      .timeline-info,
      .timeline-marker,
      .timeline-content {
        @apply .block .m-0 .p-0;
      }

      .timeline-item {
        @apply .overflow-hidden;
        padding-bottom: 40px;
      }

      .timeline-marker {
        @apply .absolute;
        left: 50%;
        margin-left: -7.5px;
      }

      .timeline-info,
      .timeline-content {
        width: 50%;
      }

      > .timeline-item:nth-child(odd) .timeline-info,
      > .timeline-item:nth-child(even) .timeline-content {
        @apply .float-left .text-right;
        padding-right: 30px;
      }

      > .timeline-item:nth-child(odd) .timeline-content,
      > .timeline-item:nth-child(even) .timeline-info {
        @apply .float-right .text-left;
        padding-left: 30px;
      }

      > .timeline-item.period .timeline-content {
        @apply .float-none .p-0 .w-full .text-center;
      }

      .timeline-item.period {
        padding: 50px 0 90px;
      }

      .period .timeline-marker:after {
        @apply .pin-b;
        height: 30px;
        top: auto;
      }

      .period .timeline-title {
        left: auto;
      }
    }
  }

</style>
