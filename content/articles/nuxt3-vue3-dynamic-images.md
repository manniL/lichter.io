---
title: "Vue 3: How to load dynamic images"
description: "With the release of Vue 3, a lot of things became easier. Unfortunately, loading dynamic assets such as images is not one of them. In the following article, I want to demystify the process of dynamic asset loading in Vue 3 or Nuxt 3 and explain why static assets can be loaded easily..."
dateModified: "2023-09-25"
datePublished: "2023-09-25"
topics:
  - vue
  - nuxt
  - vite
---

> This article is written for **Vue 3** and **Nuxt 3**.
>
> If you are looking for the **Nuxt 2**/**Vue 2** version of this article, please [follow this link to the older Nuxt 2 / Vue 2 version](/articles/nuxt2-vue2-dynamic-images).

When using Vue or Nuxt, we have are spoilt for choice when it comes to asset handling: Do we put them in the `assets` folder or should we rather utilize the `public` folder? Depending on the purpose and requirements for the image, this decision can be the one or the other. In this article, we focus on one specific use case though: What if we want to load images (or other assets) _dynamically_?

Read further to find out why loading static assets from neither folder is no problem at all and which pattern to use when the asset path or name must be dynamic.
In case you want to skip the internals and explanations, you can do so and go straight to [the solution](/articles/nuxt3-vue3-dynamic-images#the-solution), but you will miss out some in-depth information!

:toc

## Static images

Let's define our experimental use case first: Imagine a component called `Doggo.vue` which should display the image of a cute puppy.
I mean, we _all love puppies_, don’t we 🐕️?

The only thing our components needs is a template with a single image tag using the desired path as `src` attribute.

When using the `assets` folder, you can either use relative paths or an alias like `@` or `~`, which comes pre-configured in Nuxt:

```vue [via alias]
<img src="@/assets/doggos/riley.jpg">
```  

```vue [relative path]
<img src="../assets/doggos/riley.jpg">
```

In case you are using the `public` folder, the files will be mapped to your domain eventually, so you can omit the `public`:

```vue
<img src="/doggos/riley.jpg">
```

So far so good -- but what if we have a _list of cute puppies_ and the user can **decide which image to display on the page**?

## The `public` folder strategy

One suitable way is to put all the images in the `public` folder and then refer to them via a computed property.

Let's say we load the dynamic image source via Vue’s binding system. Imagine we have a small component set up where we can select a puppy:

```vue [components/doggos.vue]
<script setup lang="ts">
const dogNames = ['Riley', 'Annie', 'Marvin'];
const selectedDog = ref('');
</script>

<template>
  <div>
    <label v-for="doggo in dogNames" :key="doggo" style="margin-right: 2rem">
      <input type="radio" :value="doggo" v-model="selectedDog" />
      {{ doggo }}
    </label>
    <img :src="`/doggos/${selectedDog.toLowerCase()}.jpg`" width="500" :alt="selectedDog" />
  </div>
</template>

```

All that is left to do is to retrieve the correct image for the `selectedDog`.

```vue
<img :src="`/doggos/${selectedDog.toLowerCase()}.jpg`" :alt="selectedDog">
```

And it works! We can now select a puppy and the image will be displayed. Open [this CodeSandbox](https://stackblitz.com/edit/vue3-dynamic-images-public-folder) to see the code up and running.

This approach has a few downsides though:

* Caching: The image will be cached by the browser, so if we want to change the image, we have to change the file name as well. This is not optimal, especially if we want to use the same image in multiple places.
* Image optimization: The image will not be optimized by Vite plugins or similar, so we have to do it manually.
* Image size: The image will be loaded in its original size, which can be a problem for mobile users with a slow connection if the image is big.

Let's take a look how the approach for the `assets` folder looks like:

## The `assets` folder strategy

Alright, let's take the code from above as base. As a naive approach, why not just replace the paths using the path to assets instead?

### Naive approach

```vue
<img :src="`../assets/doggos/${selectedDog.toLowerCase()}.jpg`" :alt="selectedDog">
```

Let’s add that line quickly and see what happens when we push the button mapped to Riley…

**Bummer, a broken image** and only the alt tag! Let us take a look at the DOM. It contains the following image tag:

```html
<img src="../assets/doggos/riley.jpg" alt="Riley">
```

It means that the **asset path hasn’t been replaced**. It is the string that the expression in our template string above evaluates to, but no bundler magic happens.

So, what now?

### Bundler magic

The solution to this problem depends on the bundler you are using. If you are using Webpack with Vue 3, which is rather uncommon, you can follow the solution from the [Vue 2 / Nuxt 2 post](/articles/nuxt2-vue2-dynamic-images).

We will focus on Vite here, as it is the default bundler for Vue 3 and Nuxt 3.

As Vite does not support `require` as you might be used to if you've used webpack before, a "simple" solution with `require` is not possible.
We have to use a different approach.

### The `import.meta.glob` trick

Instead of `require`, we can use [`import.meta.glob`](https://vitejs.dev/guide/features.html#glob-import). It is a special vite function that allows us to import multiple files at once. We can use it to import all images from a folder and then use the image name as key to access the image.

Let's start simple and grab all `.jpg` files from the `@/assets/doggos` folder, where our images are located.
It is very important to be as strict as possible, otherwise you can end up with a lot of files you don't want to import, harming performance of the application.

```vue
<script setup lang="ts">

const glob = import.meta.glob('@/assets/doggos/*.jpg', { eager: true })
</script>
```

If we stringify the result, we can see that we get an object with the local image path as key and the image path in a nested object as value.
The `default` key exists, because `import.meta.glob` is used for module imports of any kind.

```json
{
  "/assets/doggos/annie.jpg": {
    "default": "/_nuxt/assets/doggos/annie.jpg"
  },
  "/assets/doggos/marvin.jpg": {
    "default": "/_nuxt/assets/doggos/marvin.jpg"
  },
  "/assets/doggos/riley.jpg": {
    "default": "/_nuxt/assets/doggos/riley.jpg"
  }
}
```

This is close to what we want, so we need to do some transformations.
We will take the entries of the object and map over them, eventually assembling them into an object again.
In the `map` function, we ensure to get rid of the nested object, to create a `{ filename: path }` structure.
to extract the filename from the path, we can use the `filename` function from [`pathe`'s utils](https://github.com/unjs/pathe).

```vue
<script setup lang="ts">
import { filename } from 'pathe/utils'

const glob = import.meta.glob('@/assets/doggos/*.jpg', { eager: true })
const images = Object.fromEntries(
  Object.entries(glob).map(([key, value]) => [filename(key), value.default])
)
</script>
```

This is also the [suggested workaround](https://github.com/nuxt/nuxt/issues/14766#issuecomment-1397365205) from Daniel Roe for achieving a "require-like" behavior with Vite.

Now, let's put it all together!

```vue
<script setup lang="ts">
import { filename } from 'pathe/utils'
const dogNames = ['Riley', 'Annie', 'Marvin'];
const selectedDog = ref('');

const glob = import.meta.glob('@/assets/doggos/*.jpg', { eager: true })
const images = Object.fromEntries(
  Object.entries(glob).map(([key, value]) => [filename(key), value.default])
)
</script>

<template>
  <div>
    <label v-for="doggo in dogNames" :key="doggo" style="margin-right: 2rem">
      <input type="radio" :value="doggo" v-model="selectedDog" />
      {{ doggo }}
    </label>
    <img
      :src="images[`${selectedDog.toLowerCase()}`]"
      width="500"
      :alt="selectedDog"
    />
  </div>
</template>
```

To see the code in action, you can also check out the [StackBlitz](https://stackblitz.com/edit/vue3-dynamic-images-assets-folder).

And we achieve a similar result to the `public` folder approach, but with the benefits of the `assets` folder:

* Caching: As vite will add a hash to the name of each image, we can change the image without changing the file name and the cache will be busted.
* Image optimization: The image can be optimized by vite plugins like [`vite-plugin-image-optimizer`](https://github.com/FatehAK/vite-plugin-image-optimizer), so we don't have to do it manually.

But it has also some downsides:

* Image name: The image name will be changed, so linking it outside of your app will be nearly impossible
* Perf-overhead: Importing the modules via glob add some overhead to the computed time, which is not optimal.

## The solution

Both approaches have their pros and cons as you can see.
I'd recommend using the `asset` folder approach only for static images which might change often in the future.

The `public` folder approach is a good default solution, especially if you use the [Nuxt image module](https://github.com/nuxt/image) to optimize your images. The module actually _requires_ the images to be in the `public` folder.
Also, this approach is the easiest solution to implement, as you don't have to do any extra work.
The only downside is that the image will be cached and you can't bust the cache as easy as with the vite-based approach.

## Conclusion

If you want to replicate a webpack-like behavior in Vite, loading images with dynamic paths is not as easy as it might seem at first glance.
But with the help of `import.meta.glob` and some extra work, we can achieve a similar result if that's the requirement.
With the `public` folder approach, we can load images dynamically without any extra work, but we have to keep in mind that the image will be cached and not optimized (so you better use the Nuxt image module).

Still have questions? No problem, drop me a Tweet (or however it is called now) at [@TheAlexLichter](https://twitter.com/TheAlexLichter), reach out on the Vue/Nuxt Discord or write me a mail (blog at lichter dot io).

I hope you enjoyed this article and learned something new! If you did, please consider sharing it with your friends and colleagues. Thanks for reading!
