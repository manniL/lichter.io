---
title: "My take on using Nuxt 2 with an API"
description: "There are three common ways to integrate an API with Nuxt. In this blog post, I'll share my personal opinion regarding all of them, my typical procedure when deciding for one approach and the benefits and disadvantages for each of them."
dateModified: "2020-04-18"
datePublished: "2019-01-11"
topics:
  - nuxt
  - api
---

Hey folks! As some of you know, I’m kind of active on the [Nuxt.js Discord](https://discord.nuxtjs.org). While answering questions there, one of the most common questions that’s neither covered in the docs (because you can’t generalize the answer) nor covered otherwise is: **"What approach should I take when using Nuxt 2 with my (self-built) API?"**

This blog post will cover _my take_ on that question. _Disclaimer_: My take does not mean “always the right way”. It’s just what I found out to be the best way _for me_ ☺️
Also be aware that this post is **not about Nuxt 3**.

:toc

## Three common approaches

There are three main approaches when it comes to using an API with Nuxt.js. Before telling you my opinion I’ll go through each of them.

* [Leveraging Nuxt’s `serverMiddleware`](#servermiddleware)
* [Using Nuxt programmatically](#using-nuxt-programmatically)
* [Working with a standalone API](#working-with-a-standalone-api)

### serverMiddleware

Nuxt.js provides so-called `serverMiddleware` which is a convenient interface to change the behavior of the underlying _[connect](https://github.com/senchalabs/connect)_ server instance. You can also early return a result so Nuxt.js doesn’t handle the path like it’d usually do but your custom `serverMiddleware` does. With this API you can add more custom functionalities to Nuxt and even leverage Express (or any other Node.js framework) **inside Nuxt** (for example to [send emails through Nuxt.js](https://blog.lichter.io/posts/emails-through-nuxtjs))!

Another use case would be a [server-side logger](https://twitter.com/TheAlexLichter/status/1055737087306199040) which is closer to the “middleware” term you might be familiar with.

You don’t need another server running for it and can combine Nuxt and your features in one instance.

A small **example** (play around with it [here](https://codesandbox.io/s/github/manniL/nuxt-servermiddleware-example/tree/master/)):

`serverMiddleware/ok.js`

```js
export default {
  path: '/test',
  handler(req, res) {
    res.end('Everything ok!')
  }
}
```

`nuxt.config.js`

```js
export default {
  serverMiddleware: [
    '~/serverMiddleware/ok'
  ]
}
```

Hitting `/test` will show you `'Everything ok!'`. The request won’t go through Nuxt.js at all (as long as it’s the initial request and not rendered client-side).

### Using Nuxt programmatically

In the `serverMiddleware` chapter I said it’s possible to use Express _inside_ Nuxt. With the programmatic approach we will do **the opposite** and use _Nuxt inside Express_ (or, as stated before, any other Node.js framework).

If you already have an Express instance running and need Nuxt only for parts of your routes (for example while transitioning from your old stack) this seems like a compelling idea!

Nuxt will be used as a _middleware_ in such cases. Below is an example with Express:

```js
const express = require('express')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')
const app = express()
const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || 3000

app.set('port', port)

// Import and Set Nuxt.js options
let config = require('../nuxt.config.js')
config.dev = !(process.env.NODE_ENV === 'production')

async function start() {
  // Init Nuxt.js
  const nuxt = new Nuxt(config)

  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  }

  // Give nuxt middleware to express
  app.use(nuxt.render)

  // Listen the server
  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}
start()
```

### Working with a standalone API

In case you are using another programming language for you API (say PHP, Python or Go), the only option you have is to separate the API and the Nuxt instance and to call your API via `axios` or `fetch`. Most of the time, the API and Nuxt will run on different servers then. This approach is _probably_ the most common one as APIs are often already existing.

## My take on it

Okay, there we go! My workflow and practices with APIs depend largely on:

* Will the page be _statically generated_ or not?
* Is the project _small_ or rather _larger_ (and how will this probably change in the future)?
* Am I building a proof of concept or similar?
* How is the actual API I want to use / I’ve built being implemented?

## Small APIs

### Static pages

While 3 months ago, most of my pages were powered by Nuxt’s dynamic `SSR` mode, I’ve converted the majority of them to static pages because they did not rely on highly dynamic data. Some examples (also open-sourced) are [developmint.de](https://developmint.de?ref=blog.licher.io), [thanks.lichter.io](https://thanks.lichter.io) and **this blog**. I’ll write more about the reasons, motivation, and general feelings in an upcoming blog post (so say tuned!).

When using static sites though, the API is lightweight most of the time. In such cases, I prefer to use serverless functions to isolate my API and remove the need for a server completely. A great example is a contact form endpoint, which was [previously](https://blog.lichter.io/posts/emails-through-nuxtjs) powered through Nuxt’s serverMiddleware but is now decoupled as a serverless function.

### Apps with server-side rendering

For apps that are highly dynamic (like [brotli.pro](https://brotli.pro?ref=blog.licher.io)) but have a small number of API endpoints _or_ for projects that are either proof of concepts or small-scaled I tend to use Nuxt’s built-in `serverMiddleware` option. It allows me to not care about _another_ app to set up and to route (keep in mind that I manage all my SSR-apps on my own VPS) and it also allows me fast prototyping. But as soon as the API grows, I can (more or less smooth) switch over to a standalone server (or many of them).

### Medium-sized APIs and above

Most of my projects involving more complex or a non-trivial amount of API endpoints are built on `Laravel` (the PHP framework). But even for those that are powered by Javascript (where I’d have all three mentioned options) I chose the same one: **A standalone API server decoupled from the Nuxt instance**.

I see some huge benefits in using this approach:

* No single point of failure - Have the API and Nuxt instance on two different servers, ideally with a backup one for each
* Separation of Concerns - The Nuxt instance does not “own” the business logic and DB access (and vice-versa)
* Easier Scaling - For the API you can use functions. Even if you don’t, you can put up load balancers and add more servers more easily
* Testing each side standalone
* Language-agnostic - Write your API in Python, Go, PHP, Elixir, Brainf\*ck, …

When using a standalone API (and having control over the server), please do not forget to set up a reverse-proxy, like NGINX, in front of your Nuxt instance and API, so you can:

* proxy the API to `/api` or whatever route you want to avoid CORS issues (use the official [proxy module](https://github.com/nuxt-community/proxy-module) in dev mode to mimic the behavior)
* add compression and caching headers
* enable HTTPS, HTTP2, and HTTPS-only-connections

(and so on). As I’m hosting all my SSR-based apps and APIs on my own servers, this is a crucial point for me and improves perf _a lot_ if done right.

### The missing approach

Some of you might have noticed that I use only two out of the three ways I introduced. The one that is missing is _using Nuxt programmatically_. But why is that the case?

Well, because I do not see any advantage in it. Quite the opposite! To me, it feels a bit awkward mixing Nuxt and a framework like Express. For example, because you can’t use the ESM syntax (import/export) in your `nuxt.config.js` out of the box or that you have to orchestrate the Nuxt Builder on your own.

Especially newcomers could easily come to wrong conclusions (like that Express will handle _all_ route calls, even when the app is past the SSR step and behaves like a traditional SPA). Also, there is no “common interface” to communicate between the underlying framework and Nuxt (which doesn’t mean it’s impossible).

There _are_ some exceptions where this combination does make, for example when using Nuxt.js with AWS or in another serverless context. If you know more, please [tweet me](https://twitter.com/TheAlexLichter)!

## Conclusion

**You can’t go wrong** with using a standalone API. It could mean a bit more effort to configure all the things but it will be worth it in the long run. If you need a way to bootstrap your app fast (eg. working on an MVP), and want to use Javascript in the backend too, utilize Nuxt’s `serverMiddleware` capacities.

But as usual, I suggest _try out_ all approaches once to see what fits best **for you**. If you’ve found out the approach you like most, feel free to check out how to [organize APIs in Nuxt.js](https://blog.lichter.io/posts/organize-and-decouple-your-api-calls-in-nuxtjs) properly!

Did I miss something or do you have a question? Tweet me at [@TheAlexLichter](https://twitter.com/TheAlexLichter), reach out on the Vue/Nuxt Discord or write me a mail (blog at lichter dot io).

Hope this article cleared up the ways to integrate an API with Nuxt.js!
