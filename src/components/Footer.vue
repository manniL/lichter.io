<template>
    <nav class="flex items-center justify-between flex-wrap bg-indigo p-2 pin-b z-10">
        <div class="flex-grow flex items-center w-auto">
            <div class="text-sm flex-grow">
                <a href="#" class="inline-block mt-0 text-indigo-lighter hover:text-white no-underline">
                    Imprint
                </a>
            </div>
            <div class="flex items-center flex-no-shrink text-white">
                <span class="font-hairline text-sm mr-2 text-grey-light">v{{version}}</span>
                <span class="font-semibold text-xl tracking-tight mr-2">That's it!</span>
                <i class="fa fa-2x fa-check mr-2 my-auto"></i>
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