---
title: "Integrate Sentry with your Nuxt 3 application - A Recipe"
description: "Sentry is a great tool to track errors and performance issues in your application - but the Nuxt module is not Nuxt 3 compatible yet. In this article, I'll show you how to integrate Sentry into your Nuxt 3 application, even before the module is ready and also share why it takes longer than you might think to build the module."
dateModified: "2023-09-27"
datePublished: "2023-09-27"
topics:
  - nuxt
  - unjs
  - nitro
  - composition-api
---

Lots of people ask for certain Nuxt 3 compatible modules. Besides authentication, the most popular question revolves around the Sentry integration. A few weeks ago, [I announced working on a port for the Nuxt 2 module](https://github.com/nuxt-community/sentry-module/issues/619#issuecomment-1713847941) - but this might take a little. In this article, I want to explain *why* it takes longer than writing an average module and also want to give you a simple [example recipe](#integrating-sentry-into-a-project) for your own Nuxt 3 project, so you don't have to wait for the module.

:toc

## The burden of a general solution

If you want to integrate a solution into one single project, no matter if it is a feature, a third-party service, or a library, it is pretty straightforward. No matter how weird the requirements are, you can almost always find a way to make it work. It only has to work for you and your team - your project **only**.

The tricky part starts when you want to make it work for more people, dare I say, for everyone. It starts with thinking about all the different use cases, all the different setups, all the different requirements. You have to make sure that your solution is flexible enough to be used in all those different scenarios, or at least 80 percent of them. Also, your solution should not be too opinionated, so it can be used in a wide range of projects, no matter how weird the requirements are - maybe even weirder than in the project you've built the integration initially for.

And then it comes to configuration...

I personally am a big advocate of convention over configuration, but sometimes you just can't get around it. If you want to make your solution flexible enough, you have to provide a way to configure it. The options should be straightforward and easy to use, ideally aligning with the mental model of potential users already. You want to find the sweet spot between too many and too few options.

Frankly, this is a common struggle for module authors! Fellow Nuxt contributor [Julien Huang](https://github.com/huang-julien/) (did I hear someone saying *server components*?) also shares similar experiences:

> While developing the Nuxt Application Insights module, I had to split what I created as my own implementation into a Nitro package (nitro-applicationinsights) first and am now working on creating a Nuxt module.
>
> It is kinda difficult to take out what specific implementation you've made for your own project and then decide, for example how to allow build time **and** runtime configuration so that the module or library is generic enough.
>
> Thankfully, we have a nice hooking system for that 😝
>
> Testing will also be quite complex as I have to dive into the source code to figure out what to mock.

In the case of the Sentry module, [Rafał](https://github.com/rchl), the author and maintainer of the Nuxt 2 module did a great job and laid out a solid foundation - but this also adds another part of complexity: Which features and settings should be ported to the Nuxt 3 module? Which features and settings should be dropped, and what should added? And how to adapt the existing set of features to make it work seamlessly with the Composition API or Nitro, Nuxt's server engine?

I am afraid I can't answer these questions yet - but I am working on it. While being committed to finding the best possible solution, it will take some time. But just because the module needs a bit more time to become Nuxt 3 compatible, this doesn't mean *you* have to wait.

### Own your implementation

And actually, it can be beneficial to own your implementation. It depends on the use case but can make sure that it fits your needs and requirements as needed and don't rely on module authors for a fix. Furthermore, you decide the scope of features and can omit unnecessary ones that might bloat your bundle, reducing complexity. In addition, you actually learn how the integration works under the hood, which means less unknown magic.

On the other hand, it might lead to increased maintenance effort as you are responsible for the implementation and have to keep it up to date. But this is a trade-off you have to make eventually, for every dependency, framework, library, or module you use.

## Integrating Sentry into a project

Okay, enough of the theory and preamble. Let's get into integrating Sentry! The following approach was also implemented by me in one of my client's projects, which is [Intrinsify's](https://intrinsify.de/) academic online portal.

We will take a look at both sides of your application, the server-side covered via integrating Sentry with Nitro, and the client side which will be covered through the Sentry Vue plugin.

To make things easier, I've created a tiny GitHub repository containing the code for this implementation, so you can easily move it into your own project. You can find [the GitHub repository here](https://github.com/manniL/nuxt3-sentry-recipe).

### Defining the runtimeConfig

Before we get into the details of each implementation, we need to define a common interface for configuration variables, which will be the `runtimeConfig` of our Nuxt app!

There are lots of configuration options, but we start simple. We need Sentry's DSN to work and also provide an environment flag to later differentiate between development, staging, and production environments.

We have to put the content in the public part of the runtime config, as the Sentry Vue plugin will be used on the client side and needs access to the configuration.

> By the way: If you want to learn more about how to properly set keys in your `runtimeConfig`, Friday's launch week surprise will be really helpful for you!

```ts [nuxt.config.ts]
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      sentry: {
        dsn: '',
        environment: 'development',
      }
    }
  }
})
```

As mentioned before, various other configuration options can be part of your `runtimeConfig` depending on your needs.
The best part is that we can now use environment variables to override the settings for different deploy:

* `NUXT_PUBLIC_SENTRY_DSN` to set up Sentry's DSN
* `NUXT_PUBLIC_SENTRY_ENVIRONMENT` to set up the correct environment tag
* And whichever config options you want to add

Alright, we are good to go for starting with the server-side implementation!

### Nitro integration - Sentry on the server side

When I originally started implementing the Nitro part of the Sentry integration, it was... tricky, to say the least.
But since Nitro v2.6, things got *way* easier thanks to the new hooks! We will use three of them straight away.
Also, this guide will work for a pure Nitro server too! Just skip the Nuxt-specific parts (e.g. ignore the `server/` folder prefix) and you are good to go. Because Nitro also supports the runtime config and is the server engine for Nuxt 3, it will be really easy to adapt the code.

Before we start with using Nitro though, we need to install the dependencies, namely Sentry's node package and the profiling integration (if desired). This can be done via `pnpm i -D @sentry/node @sentry/profiling-node`. Feel free to switch out the package manager to whatever you use.

After we do this, we will create a new Nitro plugin. In there, we want to initialize Sentry and set up the profiling integration. We will also retrieve our variables from the runtime config and set up the nitro hook:

```ts [server/plugins/sentry.ts]
import * as Sentry from '@sentry/node'
import { ProfilingIntegration } from '@sentry/profiling-node'

export default defineNitroPlugin((nitroApp) => {
  const { public: { sentry } } = useRuntimeConfig()

  // If no sentry DSN set, ignore and warn in the console
  if (!sentry.dsn) {
    console.warn('Sentry DSN not set, skipping Sentry initialization')
    return
  }

  // Initialize Sentry
  Sentry.init({
    dsn: sentry.dsn,
    environment: sentry.environment,
    integrations: [
      new ProfilingIntegration(),
    ],
    // Performance Monitoring
    tracesSampleRate: 1.0, // Change in production!
    // Set sampling rate for profiling - this is relative to tracesSampleRate
    profilesSampleRate: 1.0 // Change in production!
  })

  // Here comes the hooks
})
```

So far so good, we set up the configuration. As mentioned before, lots of things can be added to the `runtimeConfig`, such as the sample rates. We could also switch them based on `sentry.environment` though. And now let's jump into how to use the hooks.

#### Capturing errors with Sentry in Nitro

First, we want to ensure that Sentry will be capturing all kinds of errors Nitro is throwing at ~~us~~ the user. For this, we can use the `nitroApp` param from the plugin function, together with the `error` hook which will be called when an unhandled error is thrown:

```ts [server/plugins/sentry.ts]
// Inside the plugin, after initializing sentry
nitroApp.hooks.hook('error', (error) => {
  Sentry.captureException(error)
})
```

Now, **all errors** will be captured. You might not want to capture some of these, e.g. 404s or 422s, as they are usually not relevant for error tracking. This can be done with a bit of custom logic - by checking if the error is an H3Error, and if so, if the status code is one of the exceptions we don't want to track:

```ts [server/plugins/sentry.ts]
// On the top of the file, import H3Error!
import { H3Error } from 'h3'

// Inside the plugin, after initializing sentry
nitroApp.hooks.hook('error', (error) => {
  // Do not handle 404s and 422s
  if (error instanceof H3Error) {
    if (error.statusCode === 404 || error.statusCode === 422) {
      return
    }
  }

  Sentry.captureException(error)
})
```

#### Sharing Sentry with the event context

After the initial setup is done, we also want to ensure that we can use Sentry in our API routes, e.g. to attach a user, send messages, and whatever your use case is. The best way is attaching Sentry to the event context, so we can access it from any event handler. We can do this *for every request* by using the `request` hook! This hook will be called for every request, so we can attach Sentry to the event context in just four (soon three) lines.
There is a type issue in Nitro at the time of writing, but I'm confident it won't stay for long. Until then, we need to use a `@ts-ignore`, or better `@ts-expect-error` with a comment!

```ts [server/plugins/sentry.ts]
// @ts-expect-error Until https://github.com/nuxt/nuxt/issues/23437 is resolved
nitroApp.hooks.hook('request', (event) => {
  event.context.$sentry = Sentry
})
```

Okay, we are not **fully done yet** if we use TypeScript because the event context doesn't know about the `$sentry` property yet. We can fix this by augmenting the EventContext type in a `.d.ts` file in your project root:

```ts [env.d.ts]
import type { Sentry } from '@sentry/node'

declare module 'h3' {
  interface H3EventContext {
    $sentry?: Sentry
  }
}
```

It might be a bit confusing that you have to augment the `H3EventContext` but it makes total sense: Nitro is using H3 under the hood, using its event structure and context. So we have to augment the H3 event context, which will then be used by Nitro and our event handlers.

Now we can do something like this in any event handler:

```ts [server/api/my-api-endpoints.ts]
export default defineApiHandler(async (event) => {
  const sentry = event.context.$sentry
  if(sentry) {
    // Do something with Sentry if exists
    // e.g. 
    sentry.setUser({/*...*/})
  }
}
```

#### Closing Sentry on shutdown

An often forgotten task is cleaning up! We want to ensure that Sentry is gracefully shut down when the Nitro server stops.
We can achieve this by using the `close` hook:

```ts [server/plugins/sentry.ts]
nitroApp.hooks.hookOnce('close', async () => {
  await Sentry.close(2000)
})
```

And that's it! Our nitro integration is ready. Now, up to the client side.

### Nuxt integration - Setting up the client side

The client side is also not that complicated. Technically, we have to do what we did in the Nitro plugin, but on the client side. We will use a client-only Nuxt plugin for this. In there, we also initialize Sentry based on our `runtimeConfig` values and inject it into the app.

Let's not forget to add the Sentry vue plugin to our dependencies before via `pnpm i -D @sentry/vue`.

Then, we provide the vue app via `nuxtApp.vueApp` and the router via the `useRouter()` composable. Also, we use the `dsn` and `environment` keys through the `useRuntimeConfig` composable.

```ts [plugins/sentry.client.ts]
import * as Sentry from '@sentry/vue'

export default defineNuxtPlugin((nuxtApp) => {
  const router = useRouter()
  const { public: { sentry } } = useRuntimeConfig()

  if (!sentry.dsn) {
    return
  }

  Sentry.init({
    app: nuxtApp.vueApp,
    dsn: sentry.dsn,
    environment: sentry.environment,
    integrations: [
      new Sentry.BrowserTracing({
        routingInstrumentation: Sentry.vueRouterInstrumentation(router),
      }),
      new Sentry.Replay(),
    ],

    // Configure this whole part as you need it!

    tracesSampleRate: 0.2, // Change in prod

    // Set `tracePropagationTargets` to control for which URLs distributed tracing should be enabled
    tracePropagationTargets: ['localhost', 'https://your-server.com'],

    replaysSessionSampleRate: 1.0, // Change in prod
    replaysOnErrorSampleRate: 1.0, // Change in prod if necessary
  })
})
```

From here, error tracking works out of the box. Of course, you can build your own composable exposing `Sentry` helpers or import it in the components as needed - but that's up to you now as you own the implementation!

## Conclusion

We did it! Together, we set up a very simple Sentry integration for our Nuxt 3 project, only by relying on Nuxt, Nitro, and Sentry.
Don't forget to check out the [full result on GitHub](https://github.com/manniL/nuxt3-sentry-recipe).

I hope this article helped you understand why module development can be tricky, might take a little longer than just adding your own implementation, and what pros and cons owning an implementation brings with it.
Also, I hope now your Sentry setup is up and running.

If you have any questions, feel free to reach out to me as usual! And please don't forget to share this article with your friends and colleagues if you found it helpful.

Happy hacking!
