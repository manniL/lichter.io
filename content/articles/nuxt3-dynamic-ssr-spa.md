---
title: "Dynamically enable SSR or SPA mode in a Nuxt 3 app"
description: "Server Side Rendering does have some limitations, such as the inability to access platform-based APIs like local storage on the server side. However, what if you could activate SSR exclusively for pages that need SEO and employ the classic single-page application (SPA) mode for other pages? Discover how to achieve this in the following article."
dateModified: "2023-09-26"
datePublished: "2023-09-26"
topics:
  - nuxt
  - ssr
---

> This is the second post on my new blog and it feels **so good to be back at writing**! Thanks a lot for all the positive feedback on my [previous article](/articles/nuxt3-vue3-dynamic-images/). Also, don't forget to join the big open source launch party this Thursday (Sept 28th, 2023) on my [Twitch channel](https://twitch.tv/TheAlexLichter), starting 15:30! But now back to the topic!

In Nuxt 2, you could already selectively enable SSR or SPA mode based on the page URL [with a little trick](/articles/nuxt2-dynamic-ssr-spa/). However, this approach doesn't work anymore in Nuxt 3. But don't worry, in this article, we will cover three different ways to selectively switch SSR on or off for your site!

:toc

## Prelude - The \<ClientOnly> component

A common solution to render *parts* of your application only on the client is the [`<ClientOnly>` component](https://nuxt.com/docs/api/components/client-only). It is provided by default through Nuxt and can be used as a wrapper component around the content you want to render only on the client side. The following example shows how to use it:

```vue
<ClientOnly>
  This content will not be rendered on the server side
</ClientOnly>
```

You can even set a few options on the component to control the behavior, such as the content for the server-side fallback, either via props (`fallback-tag` for the tag and `fallback` for content) or via template:

```vue
<ClientOnly>
  This content will not be rendered on the server side
  <template #fallback>
    This content will be rendered on the server side, ideally this should be some loading state
  </template>
</ClientOnly>
```

While using the `<ClientOnly>` component is a great solution for rendering parts of your application only on the client side, it can be applied only at the component level. Of course, now one could start wrapping the `<NuxtPage>` component in their `app.vue`, which is actually a valid pattern if done for all pages, but not a proper solution when you only want to selectively enable or disable SSR for a few pages. Let's have a look at some solutions now!

## Solution 1 - `routeRules`

Since the introduction of [`routeRoules`](https://nuxt.com/docs/guide/concepts/rendering#hybrid-rendering), handling the rendering mode for a specific route is as easy as adding a `routeRule` to your `nuxt.config.ts`:

```ts [nuxt.config.ts]
export default defineNuxtConfig({
  routeRules: {
    '/spa-route-rule': { ssr: false }
  }
})
```

This also works for all routes that match a certain pattern, using a wildcard. Then you also have to add the index URL manually though:

```ts [nuxt.config.ts]
export default defineNuxtConfig({
  routeRules: {
    '/spa-route-rule': { ssr: false },
    '/spa-route-rule/**': { ssr: false }
  }
})
```

This is the recommended approach. But sometimes, just choosing the route might not be enough!

## Solution 2 - The experimental `x-nuxt-no-ssr` header

Another way to disable SSR, this time for the whole request and **not bound to a path**, is to set the `x-nuxt-no-ssr` header to a truthy value, like `true` or `1` when opening the page. If you try this with a default Nuxt application, nothing will happen. This is because the header is not handled by Nuxt by default. However, you can enable it by setting the `experimental.respectNoSSRHeader` option to `true` in your `nuxt.config.ts`:

```ts [nuxt.config.ts]
export default defineNuxtConfig({
  experimental: {
    respectNoSSRHeader: true,
  },
})
```

Using the header is a rather uncommon solution, but it might be useful for debugging a staging environment. Also, be aware that this is an *experimental feature* and could be adapted/changed in the future without a major version bump.
As a last note: You might not want to enable this feature in production, as it could be used to disable SSR for all pages.

## Solution 3 - A custom Nitro middleware

If you really want some *fine-grained* control over the SSR/SPA mode, you can always write your own Nitro middleware, very similar to the [`serverMiddleware` approach back in Nuxt 2](/articles/nuxt2-dynamic-ssr-spa/).
This is also the most flexible solution, as you can implement any logic you want. The following example shows how to disable SSR for a path including `/spa-header-custom`:

```ts [server/middleware/disable-ssr.ts]
export default defineEventHandler((event) => {
  if (!event.path.includes('/spa-header-custom')) {
    return
  }
  event.context.nuxt = event.context.nuxt || {}
  event.context.nuxt.noSSR = true
})
```

Be aware that this approach relies on internals, though breaking changes are unlikely to happen here. Also, the `x-nuxt-no-ssr` header is [implemented the same way internally](https://github.com/nuxt/nuxt/blob/fb26a160f5c14799317cf059499f1d41de0481e0/packages/nuxt/src/core/runtime/nitro/no-ssr.ts#L5-L6).

## Conclusion

There are many ways to selectively enable or disable SSR in your Nuxt 3 application. And you can see them all in use [in this StackBlitz](https://stackblitz.com/edit/nuxt3-dynamic-ssr-spa).

The recommended way is to use `routeRules`, as it is the most straightforward and future-proof solution. However, if you need more control, you can always use the `x-nuxt-no-ssr` header or write your own Nitro middleware.

I hope this article was helpful to you. If you have any questions, feel free to reach out to me on any of the social networks below. And as usual, please share this article with your friends and colleagues if you liked it. Happy hacking!
