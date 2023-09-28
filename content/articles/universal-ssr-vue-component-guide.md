---
title: "The Guide To Write Universal SSR-ready Vue Components"
description: "As a Vue developer, you may have heard the term server-side rendering. Even if you are not using a framework like Nuxt.js it is important to know how to write universal SSR-ready components. And guess what, it isn't even hard!"
dateModified: "2020-04-18"
datePublished: "2018-10-20"
topics:
  - nuxt
  - vue
  - ssr
---

As a Vue developer, you may have heard the term server-side rendering (SSR). Even if you are not using a framework like Nuxt.js or an SSR-plugin, it is important to know how to write _universal components_, or to put it in simpler words, components that can be interpreted from the server and the client.

If you ever want to switch to an SSR-based approach or share your component with people who do, this knowledge will definitely make your life easier! As a library/plugin author, this is a must in my opinion. And guess what, it isn’t even hard!

:toc

## Common pitfalls

There are three very common and very problematic caveats that developers should think about when writing universal components. We’ll go through all of them one by one, showing examples of wrong and right implementations!

We will use [this CodeSandBox](https://codesandbox.io/s/1rmqv4xkx3) for the examples.

### window, document, and friends - platform-specific APIs

When the component is processed on the server-side, no dynamic updates will occur. That’s why only two lifecycle hooks will be executed on the server: `beforeCreate` and `created`. This means also, that those two hooks will be **called twice**. Once on the server and once on the client side.\`

But on the server-side, there is no `window` and no `document` available (and no other browser-specific API like `fetch`. If you try to call them in these two hooks, an error will be thrown on the server. The component **cannot be server-side-rendered** anymore! That behavior can also be observed in our [example for wrong usage](https://1rmqv4xkx3.sse.codesandbox.io/platform/wrong). SSR-users could still use the component wrapped in a `<ClientOnly></ClientOnly>` tag but then it won’t have any impact on SEO and take longer to be visible at all.

This is by far the most common problem with “normal” components or 3rd party libraries in a server-side-rendered environment.

Rule of thumb: **Don’t call browser-specific APIs in `created` or `beforeCreate`**. If you have to do this, then at least perform an availability check:

```js [components/platform/check-availability.vue]
export default {
  created () {
    if (typeof window !== 'undefined') {
        window.scroll(/*...*/)
    }
  }
}
```

But in most situations, it is completely fine to call them in `beforeMount` or `mounted`. If you have to use an API on the server and the client, make sure to have to available on both sides (for example use `isomorphic-fetch` or `axios`) if you want to send AJAX requests.

Also, you can sometimes leverage `this.$el` inside a component (where `$el` is the DOM element of the component itself). This can come in handy when binding event listeners or doing query selections.

An example component of correct usage can be found under `components/platform/right.vue` in the CodeSandbox. The “bad example” is the `wrong.vue` component in the same folder.

### Lifecycle hooks and side effects

Speaking of lifecycle hooks! There is another thing you should think about: `side effects`. A function or expression has a `side effect` when it touches or modifies some state outside of the local environment. Examples are API calls, I/O operations, setting timers, using randomness, adding listeners, and so on.

To avoid memory leaks, you do not want to have side-effects in your `created` and `beforeCreate` hooks and you already know why! As these hooks getting called from the server-side as well, you cannot close a connection there or clear an interval. Instead, these objects will stay around forever and add up, causing a memory leak!

Rule of thumb: **Don’t use code with `side-effects` in `created` or `beforeCreate`**.

The examples can be found under `components/side-effects.vue` in the CodeSandbox. Every time the `Wrong.vue` component will be rendered on the server-side, a new interval will stay in the memory forever.

But _when will it be server-side rendered_? The answer is: every time a user enters the app over the `side-effects/wrong.vue` _page_ (under `pages`).

Because the first page-request to the app will be server-side-rendered and all subsequent requests (through page navigation, on-page redirects and so on) will be rendered by the client. Page refreshes and other external redirects to the app count as “entry points” and will be server-side rendered.

### No data reactivity

This is usually no big problem but it’s not bad to mention it anyway. There is no reactivity between the values on the server-side and on the client side.

If you manipulate your `data` on the server-side, these changes will not be taken into account on the client side at all. If you jump into the [bad example](https://1rmqv4xkx3.sse.codesandbox.io/reactivity/wrong), you’ll see that the value quickly changes from `10` to `0` fast. In the code, I set zero as the default value in the data function and 10 on the server-side created method.

## Directives

Custom Vue directives are often used to manipulate the DOM (eg. revealing elements on scroll or make them stick to a specific position). This won’t work on the server-side as we now know. But what can be done there?

Well, the easiest way is: **Don’t use directives as the abstraction, use components**. I did this with components like [VueNextLevelScroll](https://github.com/Developmint/vue-next-level-scroll) or [vue-if-bot](https://github.com/Developmint/vue-if-bot) because it is way easier to make them universally usable and they can be code-split as well! You **don’t lose** anything by choosing components as an abstraction.

If you really want to use directives, you can add a server-side equivalent of this directive. In Nuxt, this is possible by setting up a `directives` object in the `this.options.render.bundleRenderer` object in the `nuxt.config.js`. A good (but complex) example is the official `v-model` [ssr directive](https://github.com/vuejs/vue/blob/dev/src/platforms/web/server/directives/model.js).

~~**Attention**: Be aware to pass in your directives in `kebab-case` (`make-red` instead of `makeRed`). Otherwise, they won’t be recognized! This is a bug in `vue-server-renderer` (follow [this issue](https://github.com/vuejs/vue/issues/8961) for more info).~~ This has been fixed in Vue 2.5.19!

The [matching example](https://1rmqv4xkx3.sse.codesandbox.io/directives) will show you why you definitely should use components or server-side directives. Do you notice the flickering for the client-side-only directive example? It will be noticeable for all users that use this page as an entry point.

## Conclusion

Alright, let’s wrap it up, folks! If you want to go through the example code line by line, please take a look into [the CodeSandBox](https://codesandbox.io/s/1rmqv4xkx3).

* Be careful when using _platform-specific_ APIs, especially `window` and `document`
* Keep in mind that `created` and `beforeCreate` are executed on the server and client side. **No side effects, no `window`**
* There is no reactivity on the server side
* Using directives isn’t always the best abstraction. But if you do use them, provide a **server-side directive**

If you want further reading, I suggest reading the official [vue-ssr-docs](https://ssr.vuejs.org/)!

Still have questions? No problem, tweet me at [@TheAlexLichter](https://twitter.com/TheAlexLichter), reach out on the Vue/Nuxt Discord or write me a mail (blog at lichter dot io)

I hope you enjoyed that article and are now a bit more aware of server-side-rendering compatibilities!
If this is the case, I’d gladly ask you to **spread the word**!
