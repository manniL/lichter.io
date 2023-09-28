---
title: "Nuxt 2 on Brotli"
description: "Brotli, a somewhat new compression from Google is getting more and more traction. To minify your Nuxt.js application as good as possible, you should set up Brotli compression for it as well! Learn how to in this article."
dateModified: "2020-04-17"
datePublished: "2018-09-09"
topics:
  - nuxt
  - brotli
  - javascript
  - compression
---
As a developer, you likely want to squeeze every unnecessary bit out of your Nuxt.js app. To accomplish this there are lots of nifty tools: From code-splitting over caching to compression. This post focuses on the latter.

:toc

## Introduction

If you’ve ever heard compression related to the web, `GZIP` was likely mentioned in the same sentence. It’s the most popular compression method and support by the browser for more than _eighteen years_!

Other compression methods were introduced in that time but for long none was able to show up better compression results, browser support, and compression speed.

This changed when [`Brotli`](https://github.com/google/brotli/), an open-source algorithm from Google was released back in 2015.

`Brotli` has, similar to `GZIP`, different compression levels which influence results and speed. Comparing the default setups of the algorithms, `Brotli` excels in **both**, speed and file size! There is a [great article](https://blogs.akamai.com/2016/02/understanding-brotlis-potential.html) from Akamai covering more statistics and details.

So, why shouldn’t we use `Brotli` instead of `GZIP` for our Nuxt.js 2 app?

## Add Brotli to Nuxt.js

Already earlier in 2018 I thought this might be a [good idea](https://github.com/nuxt/nuxt.js/issues/3117) and now we are here! Adding `Brotli` compression (with `GZIP` fallback) is real in Nuxt 2. I’m afraid that the guide will not work for `nuxt@1.4.X`) or lower. Also, you need `SSR`/`universal` mode enabled. If you use Nuxt as static site generator or SPA you have to configure your underlying server.

## Before we continue

**Important notice:** In general, I highly recommend to configure your platform provider, e.g. Heroku or AWS, or web server, like Apache or NGINX, to handle Brotli and GZIP compression because it will be way more performant. If you can’t for any reason, then setting it up in Nuxt is a decent option.

### Compression middleware

Every time Nuxt.js renders a page it will call a bunch of middleware (f.ex. the error middleware to handle possible server-side errors). An important middleware that will be called is the _compression middleware_ which will, as the name hints, compress the response. By default, the [`compression`](https://www.npmjs.com/package/compression) package will be used for it. And there our first problem occurs…

This package **does not support** `Brotli` (see [this GitHub issue](https://github.com/expressjs/compression/issues/71)).

### Swap out the middleware

What if we could swap out the middleware for another… would this solve our problem? At least it would bring us one step further to the goal.

And as I said above, with Nuxt 2 it’s [possible](https://github.com/nuxt/nuxt.js/pull/3863).

Now we have to find a suitable middleware!

During my research, I found a package called [shrink-ray](https://github.com/aickin/shrink-ray) which is actually a fork of the `compression` package and would cover everything we need (and even more!). Unfortunately, the package is abandoned but after looking through a few issues and forks, I found out that a pretty active fork exists and was published as [`shrink-ray-current`](https://www.npmjs.com/package/shrink-ray-current). Thanks to the maintainer [Alorel](https://github.com/Alorel) for keeping the `shrink-ray` middleware alive!

### Insert the middleware

Alright, all prerequisites fulfilled. Let’s get into the code!

First, install the packages (`npm i shrink-ray-current nuxt`, of course, you can use `yarn` as well). This might take a little as `brotli` will be compiled directly on your device. If you have troubles installing `shrink-ray-current`, be sure to check the package page and fulfill all prerequisites.

Now edit your `nuxt.config.js` (or create one if there is none in your project yet) and change the `render.compressor` parameter as described in the [docs](https://github.com/nuxt/docs/blob/9a1f2bb54fda56a1858399317ae3a5d564fce671/en/api/configuration-render.md) (the changes won’t be published to the [doc-website](https://nuxtjs.org/api/configuration-render#compressor) until Nuxt 2 is out)

`nuxt.config.js`

```js
import shrinkRay from 'shrink-ray-current'

export default {
  render: {
    compressor: shrinkRay()
  }
}
```

Be careful to actually **invoke `shrinkRay`** (so don’t miss the `()` after).

And that’s it! Start your app (in _production mode_, otherwise no compression will take place) and open your browser. Jump into your developer tools, select your network tab and reload the page. Now click the table header in the network tab and add the `Content-Encoding` header (can be found under _Response Headers_) Then you should see that your requests are using `Brotli`, denoted by a little `br`.

If you see `gzip` instead, then you should try to open the same page in Google Chrome. I’m a heavy Firefox user, but Firefox refused to enable `Brotli` on localhost. As `Brotli` will only be **served over `HTTPS`**, that seems like a correct behavior first but because `localhost` is considered a “safe origin” (service workers are allowed, …) it’s a bug.

  ![Network tab showing several loaded scripts in Brotli compression](https://img.lichter.io/blog/nuxt-on-brotli/network-tab-brotli-compression-full.jpg)

Firefox network tab displaying different scripts loaded with Brotli compression

## Compatibility

Oh right, before we forget it! What happens if a user with an older browser (say IE 11) wants to connect to our app? Will they get an error?

**No! That’s not a problem.** Our `shrinkRay` middleware will check the `Accept-Encoding` header of the request. It has been set by the client (f.ex. your browser) and provides information about the client’s supported compression formats. Depending on the header, `shrinkRay` will apply `Brotli`, `GZIP` or even nothing at all!

## Troubleshooting

### Proxies

If you are using a proxy (likely the [`proxy-module`](https://github.com/nuxt-community/proxy-module/) you **must exclude** these routes from your `shrinkRay` middleware because weird serve errors will occur otherwise (I’ve spent some time to find out why the blog always threw server errors), for example JSON that is compressed (and therefor not processable). If this doesn’t help, try to change your API compression to `GZIP` (not `Brotli`, see below why) or to no compression at all.

I usually create a mapping from `/api/` to `api.myurl.com`

`nuxt.config.js`:

```js
export default {
  modules: ['@nuxtjs/axios'],
  render: {
    compressor: shrinkRay()
  },
  // ...
  proxy: {
    '/api/': { target: 'api.myurl.com', pathRewrite: { '^/api/': '' } }
  }
  // ...
}
```

You now have to exclude all requests starting with `/api/`. We leverage `shrink-ray`'s `filter` object and the built-in equally named function to implement this behavior.

```js [nuxt.config.js]
export default {
  modules: ['@nuxtjs/axios'],
    render: {
    compressor: shrinkRay({
      filter: (req, res) => {
        if (/^\/api/.test(req.originalUrl)) {
          return false
        }
        return shrinkRay.filter(req, res)
      }
    })
  },
  // ...
  proxy: {
    '/api/': { target: 'api.myurl.com', pathRewrite: { '^/api/': '' } }
  }
  // ...
}
```

Now we exclude all `/api` requests and will otherwise delegate the filtering back to `shrink-ray`.

### Final Testing

To ensure that Brotli is enabled on your site now, you can use an online tool called [Brotli.Pro](https://www.brotli.pro/?ref=blog.lichter.io) which will tell you whether your website supports Brotli compression or not!

### Brotli encoded XHR requests

**UPDATE: Outdated! `axios-module` v5.3.6 and later will ignore Brotli encoding on server side by default**

~~Now you might think the next would be setting up `Brotli` for your API as well, right? I **would not recommend** this as long as `Brotli` has no native support from Node.js (see [this PR](https://github.com/nodejs/node/pull/20458)). `Axios` has no support for `Brotli` on server-side by default and trying to monkey patch it isn’t worth it in my opinion. It is also not possible to change the `Accept-Encoding` header through `axios` (server-side). That leaves you with decompressing the `Brotli` requests on your own, which, again, will get messy very fast.~~

~~On the client-side, axios will delegate the decoding to the browser (and most modern browser support `Brotli` as we know)~~

## Closing remarks

Once again, **we did it!** As a personal summary, I’ve decreased my blog’s index page size from 210kB to 170kB, which is a total of **19% decrease** in size.

As soon as you finished your setup (which should be soon because you reached the end of the post) be sure to tell me how many kilobytes you saved!

I’ve uploaded a sample setup for you on [GitHub](https://github.com/manniL/nuxt-brotli-example). All you have to do is to clone the repository, install the package and you are good to go!

All in all, I hope this article helped you a little. If so it would be awesome if you could **spread the word** (for example by using the buttons below the article).

**Questions left? Critics? Have you successfully stepped through the setup?**

Hit me up on Twitter ([@TheAlexLichter](https://twitter.com/TheAlexLichter)) or write me a mail (blog at lichter dot io).
