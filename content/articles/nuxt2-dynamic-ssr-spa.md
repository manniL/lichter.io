---
title: "Selectively enable SSR or SPA mode in a Nuxt.js 2 app"
description: "SSR comes with certain caveats, including no access to APIs like the local storage on server-side. But what if you could enable SSR only for pages where SEO is needed and use the \"traditional\" SPA mode elsewhere? You can! Learn how in this article."
dateModified: "2020-04-18"
datePublished: "2018-12-29"
topics:
  - nuxt
---

> This article is written for **Nuxt 2**.
>
> If you are looking for the **Nuxt 3** version of this article, please [follow this link to the updated Nuxt 3 version](/articles/nuxt3-dynamic-ssr-spa).

Hey Nuxt friends! As you might already have experienced, SSR [comes with certain caveats](/articles/universal-ssr-vue-component-guide/), including no access to browser-specific APIs, like the local storage, on the server-side. But what if you could enable SSR only for pages where SEO is needed and use the “traditional” SPA mode elsewhere, say in a “member area” in your Nuxt 2 application.

Guess what? **You can do that!** In the following post I’ll show you how to selectively disable SSR or SPA mode based on the page url.

:toc

## The Nuxt Source Code

Before going into detail on how to enable SSR selectively we should look into the Nuxt.js source code to see how Nuxt makes such a distinction possible. The responsible snippet can be found in the [vue-renderer package](https://github.com/nuxt/nuxt.js/blob/99614535b5b4af0e2644ed172d7517804aaa1094/packages/vue-renderer/src/renderer.js#L311-L338). Let’s dissect it one line after each other!

1. Extract `req` and `res` (the request and response object from the request to the server) from the context object.

```js
const { req, res } = context
```

2. If `context.spa` (might have been set through other internals before rendering pages) or `res.spa` (can be modified otherwise!) is truthy, treat the page that’ll be rendered as **SPA**.

```js
const spa = context.spa || (res && res.spa)
```

3. In case SSR is _disabled_ or the page _should be treated as SPA_, only load metadata and render the page as SPA (with JavaScript files but no HTML included) through an _early return_.

```js
if (!this.SSR || spa) {
  const {/* ... */} = await this.renderer.spa.render(context)
  const html = this.renderTemplate(/* ... */)
  return { html, getPreloadFiles: this.getPreloadFiles.bind(this, { getPreloadFiles }) }
}
```

And that’s all the magic ☺️

## Implementation

After looking into the source code we found out that all we have to do is to set `res.spa` for the pages where we want to **disable server side rendering**. This only has to happen on the server-side because a Nuxt app will behave like a traditional SPA on client-side anyway. If we think about server-side only manipulation, the first thing that should come into our minds should be `serverMiddleware` (see also: [Sending Emails Through Nuxt.js via serverMiddleware](/articles/nuxt-emails)). Using them comes with two major benefits:

1. `serverMiddleware` are a concept that is directly provided through the framework (no 3rd party libs needed)
2. We can freely customize our selection logic.

A minimalist implementation would look like this:

```js
export default function(req, res, next) {
  const paths = ['/', '/a']

  if (paths.includes(req.originalUrl)) {
    // Will trigger the "traditional SPA mode"
    res.spa = true
  }
  // Don't forget to call next in all cases!
  // Otherwise, your app will be stuck forever :|
  next()
}
```

To see a working example directly, you can [check out the CodeSandbox](https://codesandbox.io/s/github/manniL/nuxt-selectively-enable-ssr-or-spa/tree/master/). Be aware that it runs in `dev` mode so the difference between SPA and SSR isn’t that huge but still distinguishable via `process.server`.

## Wrapping up

You might ask yourself: **Do I need to selectively switch between the modes?** The answer is most of the time: **No**. But there might be some situation where you want to avoid wrapping a lot of page contents in `<ClientOnly>` tags (especially for dashboards or member areas) that are part of your SEO-heavy app. It might be a niche but it has it’s use cases.

What did you use the selective SPA/SSR for? Please tweet me at [@TheAlexLichter](https://twitter.com/TheAlexLichter), reach out on the Vue/Nuxt Discord or write me a mail (blog at lichter dot io).

I hope you enjoyed the article and the small Nuxt source code dive. If this is the case, I’d gladly ask you to **spread the word**!
