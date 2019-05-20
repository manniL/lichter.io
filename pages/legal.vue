<template>
  <!-- eslint-disable vue/max-attributes-per-line -->
  <section class="flex flex-col flex-wrap items-center bg-gray-lighter py-8 leading-normal text-gray-darkest">
    <div class="justify-around items-center w-5/6 md:w-1/2 mx-auto">
      <h1>Legal Disclosure</h1>
      Information in accordance with section 5 TMG
      <br>
      <br>
      Developmint GbR<br>
      Corotweg 15<br>
      04289 Leipzig<br>
      <h2>Represented by</h2>
      Alexander Lichter
      <br>
      Max Langer
      <br><br>
      <h3>Personally liable partner</h3>
      Alexander Lichter
      <br>
      Max Langer
      <br><br>
      <h2>Contact</h2>
      E-Mail: <a href="mailto:hello@lichter.io">
        hello@lichter.io
      </a>
      <br>
      Website: <a href="https://www.lichter.io/" target="_blank" rel="noopener">
        www.lichter.io
      </a><br>
      Website: <a href="https://www.developmint.de/" target="_blank" rel="noopener">
        www.developmint.de
      </a>
      <br>
      <h2>VAT number</h2>
      VAT identification number in accordance with section 27 a of the German VAT
      act
      <br>
      DE301268038
      <br>
      <h2>Person responsible for content in accordance with 55 Abs. 2 RStV</h2>
      Alexander Lichter<br>
      <h2>Indication of source for images and graphics</h2>
      <a href="http://vuejs.org/" rel="noreferrer noopener nofollow" target="_blank">
        Vue.js
      </a><br>
      <a href="http://laravel.com/" rel="noreferrer noopener nofollow" target="_blank">
        Laravel
      </a><br>
      <a href="https://nodejs.org/" rel="noreferrer noopener nofollow" target="_blank">
        Node.js
      </a><br>
      <a href="https://getbootstrap.com/" rel="noreferrer noopener nofollow" target="_blank">
        Bootstrap
      </a><br>
      <a href="http://tailwindcss.com/" rel="noreferrer noopener nofollow" target="_blank">
        Tailwind
      </a><br>
      <a href="https://git-scm.com/" rel="noreferrer noopener nofollow" target="_blank">
        Git-scm
      </a><br>
      <a href="https://webpack.js.org/" rel="noreferrer noopener nofollow" target="_blank">
        Webpack
      </a><br>
      <a href="https://travis-ci.org/" rel="noreferrer noopener nofollow" target="_blank">
        Travis CI
      </a><br>
      <a href="http://fontawesome.io/icons/" rel="noreferrer noopener nofollow" target="_blank">
        FontAwesome
      </a><br>
      <br><br>
      <h2>Disclaimer</h2>
      <br>
      <b>Accountability for content</b>
      <br>
      The contents of our pages have been created with the utmost care. However, we
      cannot guarantee the contents' accuracy,
      completeness or topicality. According to statutory provisions, we are
      furthermore responsible for our own content on
      these web pages. In this context, please note that we are accordingly not
      obliged to monitor merely the transmitted or
      saved information of third parties, or investigate circumstances pointing to
      illegal activity. Our obligations to
      remove or block the use of information under generally applicable laws remain
      unaffected by this as per &sect;&sect;
      8 to 10 of the Telemedia Act (TMG).
      <br>
      <br>
      <b>Accountability for links</b>
      <br>
      Responsibility for the content of external links (to web pages of third
      parties) lies solely with the operators of
      the linked pages. No violations were evident to us at the time of linking.
      Should any legal infringement become known
      to us, we will remove the respective link immediately.
      <br>
      <br>
      <b>Copyright</b>
      <br>
      Our web pages and their contents are subject to German copyright law. Unless
      expressly permitted by law
      (&sect; 44a et seq. of the copyright law), every form of utilizing,
      reproducing or processing works subject to
      copyright protection on our web pages requires the prior consent of the
      respective owner of the rights. Individual
      reproductions of a work are allowed only for private use, so must not serve
      either directly or indirectly for earnings.
      Unauthorized utilization of copyrighted works is punishable (&sect; 106 of
      the copyright law).
      <br>
      <br>
      <b>Licensing</b>
      <br>
      <ul>
        <li>
          Source code of this page (can be found on
          <a href="https://github.com/manniL/lichter.io" rel="noreferrer noopener nofollow" target="_blank">GitHub</a>)
          -
          <a href="https://raw.githubusercontent.com/manniL/lichter.io/master/LICENSE"
             rel="noreferrer noopener nofollow"
             target="_blank"
          >
            MIT
          </a>
        </li>
        <li>
          Text, journalistic and other written content: Alexander Lichter -
          <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/"
             rel="noreferrer noopener nofollow"
             target="_blank"
          >
            CC-BY-NC-SA 4.0
          </a>
        </li>
        <li>Text on the legal notice and privacy page: Alexander Lichter - All rights reserved</li>
      </ul>
    </div>
  </section>
</template>

<script>
export default {
  head() {
    return {
      title: 'Legal notice - Lichter.io',
      meta: [
        { hid: 'robots', name: 'robots', content: 'noindex' }
      ]
    }
  }
}
</script>

<style scoped>
  h1 {
    @apply font-bold text-2xl
  }
  h2 {
    @apply font-bold text-xl
  }
  h3 {
    @apply font-bold text-lg
  }
  a {
    @apply underline text-blue-400;

    &:hover {
      @apply text-indigo-400
    }
  }
  ul {
    @apply list-disc px-8
  }
</style>
