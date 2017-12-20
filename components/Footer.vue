<template>
    <nav class="flex items-center justify-between flex-wrap bg-indigo p-2 pin-b z-10">
        <div class="flex-grow flex items-center w-auto">
            <div class="text-sm flex-grow">
                <nuxt-link to="/legal" class="inline-block mt-0 text-indigo-lighter hover:text-white no-underline">
                    Legal notice
                </nuxt-link>
            </div>
            <div class="flex items-center flex-no-shrink text-white">
                <a class="font-hairline text-sm mr-2 text-grey-light no-underline hover:text-grey"
                   href="https://github.com/manniL/lichter.io" target="_blank" rel="noreferrer noopener">
                    v{{version}}
                </a>
                <span class="font-semibold text-xl tracking-tight mr-2">That's it!</span>
            </div>
        </div>
    </nav>
</template>
<script>
  export default {
    computed: {
      version () {
        /* eslint-disable no-undef */
        return VERSION
      }
    }
  }
</script>