---
title: "How to load dynamic images in Vue 2 and Nuxt 2 with ease"
description: "Loading images with a dynamic source often confuses developers that are new to Vue and Nuxt.js. In the following article, I want to demystify the process of dynamic image loading in Vue and Nuxt, and explain why static images can be loaded easily..."
dateModified: "2023-09-25"
datePublished: "2019-08-18"
topics:
  - vue
  - nuxt
  - webpack
---

> This article is written for **Vue 2** and **Nuxt 2**.
>
> If you are looking for the **Nuxt 3**/**Vue 3** version of this article, please [follow this link to the updated Nuxt 3 / Vue 3 version](/articles/nuxt3-vue3-dynamic-images).

Importing images from the `assets` folder when the path is static is not that difficult in both frameworks, Vue and Nuxt.js. But loading images with a dynamic source often confuses developers that are fairly new to one of these frameworks. In the following article I want to demystify the process of dynamic image loading in Vue and Nuxt. Furthermore I’ll explain why static images can be loaded easily and what to do when the path has to be dynamic. If you want to skip the internals and explanations, you can also go directly to [the solution](#the-solution) and the CodeSandbox. But you are missing out some in-depth information!

:toc

## Static images

Imagine a component called _Doggos_ that should show an image of a cute puppy. I mean, we all love puppies, don’t we?

The only thing our components needs is a template with a single image tag pointing to the path. Ideally by utilizing an alias:

```vue
<img src="@/assets/doggos/riley.jpg">
```  

(with an alias for the source directory)

```vue
<img src="../assets/doggos/riley.jpg">
```

(relative path without alias)

But what if we have a list of cute puppies and the user can decide which image to display on the page?

## The typical first idea

A common attempt to load a dynamic image source in Vue or Nuxt is to utilize Vue’s binding system. Imagine we have a small component set up where we can select a puppy:

```vue [components/doggos.vue]
<template>
  <div>
    <div>
      <label v-for="doggo in dogNames" :key="doggo" style="margin-right: 2rem">
        <input type="radio" :value="doggo" v-model="selectedDog">
        {{ doggo }}
      </label>
    </div>
    <!-- Here should be the dog image -->
  </div>
</template>

<script>

export default {
  data () {
    return {
      selectedDog: "",
      dogNames: ["Riley", "Annie", "Marvin"]
    }
  }
}
</script>
```

All that is left to do is to retrieve the correct image for the `selectedDog`. Now one could think: “Nothing easier than that! `:src` to the rescue!”

```vue
<img :src="`../assets/doggos/${selectedDog.toLowerCase()}.jpg`" :alt="selectedDog">
```

Let’s add that line quickly and see what happens when we push the button mapped to Riley…

**Bummer, a broken image** and only the alt tag! Let us take a look at the DOM. It contains the following image tag:

```vue
<img src="../assets/doggos/riley.jpg" alt="Riley">
```

What does that mean?

It means that the **asset path hasn’t been replaced**. It is the string that the expression in our template string above evaluates to.

## The `public`/`static` folder as a possible workaround (usually not recommended)

If we move our dog images into the `public` folder (or the `static` folder in Nuxt), and use the code from above with the new folder reference (`/public/doggo/${selectedDog.toLowercase()}.jpg`), “_it works_”. But it is not optimal and I really **would not recommend that workaround**. The difference between the two folders `assets` and `public`/`static`, and the reason why the first attempt failed, is **Webpack**.

Content in the `public` or `static` folder, is directly mapped to the root of your web applications (usually `/`) and _not processed by Webpack_. No optimizations, added content hashes and so on.

While it is sometimes necessary, for example for preview images which need a fixed URL, it brings no benefits for our use case. What if we want to swap out the image for Marvin when he grew up a little? We might hit caching issues. Let’s dig a bit deeper and find the root cause instead of going for the “quick fix” which will consume more time on the long run. You likely know that pattern

## Vue and Webpack asset handling

All single file components (with the `.vue` extension) are processed by Webpack and the [`vue-loader`](https://vue-loader.vuejs.org/). Because of them, single file components and all their amazing features, like supporting CSS pre-processors, custom blocks and state-preserving hot reloading, work out of the box. This also includes the [handling of **static assets**](https://vue-loader.vuejs.org/guide/asset-url.html#asset-url-handling), like in our initial component example.

Webpack will import static assets like `../assets/doggos/riley.jpg` as so-called _module requests_, which means they are handled by a matching Webpack loader defined through a Webpack config. Both, `vue-cli` and Nuxt have configured the handling for multiple file types out of the box, including images with different extensions like jpg, png or gif.

After being processed, our initial image tag example `<img src="../assets/doggos/riley.jpg" alt="Riley">` will be compiled to a render function that will look similar to this code:

```js
createElement('img', {
  attrs: {
    src: require('../assets/doggos/riley.jpg'), // this is now a module request
    alt: 'Riley'
    }
})
```

The image path has now been replaced with a Webpack _module request_. This works fine for static assets because **their paths are known at build time.** When it comes to dynamic content, including Vue’s `v-bind` directive, Webpack does not know what the expressions at runtime will evaluate to. That’s the reason why the common first idea as described above does not work as expected.

What can we do then?

If we take a closer look at the compiled code of our simple image tag with the static source attribute, we can find out what we need to solve the issue.

## The solution

To tell Webpack which images should be loaded, we have to issue a _module request_ on our own. This is done by calling `require(...)` with the correct path. In our situation, that would lead to the following image tag:

```vue
<img :src="require(`../assets/doggos/${selectedDog.toLowerCase()}.jpg`)" :alt="selectedDog">
```

Instead of binding the `src` attribute to the image path, we bind it to the webpack module requested for the image path.

We can now extract that nasty part into an own computed property for better readability.

```js
export default {
  // ...
  computed: {
    dogImage () {
      if (!this.selectedDog) {
        return
      }

      const fileName = this.selectedDog.toLowerCase()

      return require(`../assets/doggos/${fileName}.jpg`) // the module request
    }
  }
}
```

It is **very important** that you are as strict as possible when it comes to the possible image file name. If we use the code from above, the final build will include every image with a `.jpg` extension in the `/assets/doggos` folder.

That happens because webpack cannot guess which of the images will actually be used at runtime, so it includes them all to prevent errors. The less strict you are, the more files will match and will be included in the bundle by webpack, leading to a larger bundle size.

**We solved it**! With `require` to the rescue, we can now load image with a dynamic src attribute as well. As usual, the final (working) code, including cute puppy pictures, is available [in a CodeSandbox to try it out](https://codesandbox.io/s/how-to-load-dynamic-images-in-vue-3eu3x).

## Bonus - using srcset

Nowadays, responsive images are a must-have on your website. They don’t only save bandwidth but also time of your users _and_ are good for SEO. But how do we use `srcset` with dynamic images?

_Almost_ the same way we do with the normal `src` tag! As we need a couple of images now, a computed property is the best way to build your final srcset string step by step. In our example, we want to use two dog pictures with different widths. The name format is always <DOG\_NAME>\_.jpg, which we can utilize. And we will also re-use our `dogImage` from above as fallback image.

```vue
<template>
  <img :srcset="this.dogSourceset" sizes="(max-width: 600px) 480px, 800px" :src="dogImage">
</template>

<script>
export default {
  // ...
  computed: {
    dogSourceset () {
        const baseName = this.selectedDog.toLowerCase()
        return `${require(`@/assets/img/${this.baseName}_480.jpg`)} 480w, ${require(`@/assets/img/${this.baseName}_800.jpg`)} 800w`
    },
    dogImage () { /* ... */ }
  }
}
</script>
```

There we go! A working image with srcset definition. And that’s not the end: You could even go further and create `<picture>` tags with different sources that have their own srcsets (but e.g. a different format like webp and jpg). But it all comes down to the same technique I presented your here.

## Conclusion

Loading images with dynamic paths isn’t that difficult if one knows what’s going on behind the scenes. By using `require` and a strict expression, you will never have problems with dynamic images again! I hope you’ve learned a thing or two, about dynamic images but also about the process behind static asset processing.

If you want some further reading, I suggest checking out the [vue-loader docs](https://webpack.js.org/guides/dependency-management/#require-with-expression) and the [Webpack documentation](https://webpack.js.org/guides/dependency-management/#require-with-expression).

Still have questions? No problem, tweet me at [@TheAlexLichter](https://twitter.com/TheAlexLichter), reach out on the Vue/Nuxt Discord or write me a mail (blog at lichter dot io).

I really hope you’ve enjoyed that article! If you know some people who also have trouble with dynamic image loading in Vue or Nuxt, I’d gladly ask you to **spread the word** and help them out!
