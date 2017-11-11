<template>
    <nav class="flex items-center justify-between flex-wrap bg-red p-4 sticky pin-t z-10">
        <a href="/" class="flex items-center flex-no-shrink text-white mr-6 no-underline">
            <i class="fa fa-2x fa-lightbulb-o mr-2"></i>
            <span class="font-semibold text-xl tracking-tight">Lichter.io</span>
        </a>
        <div class="block lg:hidden">
            <button class="flex items-center px-3 py-2 border rounded text-red-lighter border-red-light hover:text-white hover:border-white">
                <i class="fa fa-bars" title="Menu"></i>
            </button>
        </div>
        <div class="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
            <div class="text-sm lg:flex-grow">
                <a href="#"
                   class="block mt-4 lg:inline-block lg:mt-0 text-red-lighter hover:text-white mr-4 no-underline">
                    About me
                </a>
                <a href="#"
                   class="block mt-4 lg:inline-block lg:mt-0 text-red-lighter hover:text-white mr-4 no-underline">
                    Skills
                </a>
                <a href="#" class="block mt-4 lg:inline-block lg:mt-0 text-red-lighter hover:text-white no-underline">
                    Timeline
                </a>
            </div>
            <div>
                <a href="#"
                   class="block mt-4 lg:inline-block lg:mt-0 text-red-lighter hover:text-white mr-4 no-underline">
                    I have a Blog too!
                </a>
            </div>
        </div>
    </nav>
</template>
<script>
  export default {}
</script>