---
title: "Going Jamstack with Netlify and Nuxt 2"
description: "Jamstack is a growing and modern web architecture. I gradually migrated several Nuxt.js projects from server side rendering over to JAMstack and write about my experiences, recommendations and the migration process itself."
dateModified: "2020-04-17"
datePublished: "2019-01-29"
topics:
  - nuxt
  - jamstack
  - netlify
  - cloudflare
---


In the last month, I gradually migrated several projects from server-rendered Nuxt.js applications to statically generated websites, powered by Nuxt.js too, as already hinted in my [previous article](/articles/nuxt-with-an-api/).

It all started with my [portfolio](https://lichter.io/) which consists of one larger page and two pages for privacy and legal notice. All three pages have actually no dynamic data involved (as you can see in the source code). The text, the images and everything else are completely hardcoded. Last year, the page was served from one of my Virtual Private Servers (VPS) by always running Node.js server. The only purpose of it was to respond with the same content again and again.

At some point, I thought that there must be a better way, so I started using Nuxt.js as Static Site Generator. Now no Node server was involved anymore, only plain HTML files that were served by the VPS. Not too bad, but… why do I need a **server at all** for managing a simple static page? Correct, I **do not!** But more about that in a second.

:toc

## Jamstack?

So, the title of the article is “Going Jamstack with Netlify and Nuxt 2”. But you might ask yourself: “What the heck is Jamstack?”. Fair enough! Jamstack is a new and modern way of web development based on **J**avascript, **A**PIs and **M**arkup.

A Jamstack project will be _pre-built_ at deploy time, mostly with the help of a Static Site Generator. The markup itself is static and won’t be dynamically created or modified by the server. All the dynamics will be handled by client-side Javascript, and it doesn’t matter which framework or library you use for that.

Last but not least: All page interactions, like submitting forms or retrieving more content, are handled through APIs that are called via HTTP(S). Most of the time, microservice-based APIs or serverless functions are used in combination with the Jamstack approach.

Further information about Jamstack can be found on the official [Jamstack.org](https://jamstack.org/) page.

## Why going Jamstack

Okay, so far so good. Now you might have another question: “Why should I go for Jamstack?”. There are _four main reasons_ in my opinion.

### Simplicity

As mentioned briefly in the introduction, you don’t need a server anymore to host your website. Instead, you can use platforms like [GitHub Pages](https://pages.github.com/) or [Netlify](https://www.netlify.com/) and let them grapple with the underlying infrastructure and maintenance. No more server management!

It gets even better: No more difficult deploys as well. As the markup will be pre-built you could set up webhooks to re-build your website when data changes, e.g. when you update a blog post.

### Security

Guess how often websites are being targeted by hackers? A [Forbes article](https://www.forbes.com/sites/jameslyne/2013/09/06/30000-web-sites-hacked-a-day-how-do-you-host-yours/) from 2013 shows that back then, more than 30,000 Wordpress pages were hacked **every day**, which is an insane number. With Jamstack, you decrease your attack surfaces a lot because your site isn’t served by a _server_ anymore. Sure, you still have the APIs as possible targets but as they are _decoupled_ and _isolated_ from each other, at least most of the time, it’ll give the attacker a harder time, too.

No system is 100% secure but with Jamstack, things get less attractive for potential adversaries by default. And even if you are using a content management system like Wordpress through an API to populate your upcoming website: Ideally[^1] you wouldn’t expose your API at all because you could prefetch all the data needed and persist them as JSON files.

### Performance

As your entire page is purely consisting of static assets like HTML documents, Javascript files and images, you should put all your files on a Content Delivery Network (CDN), so they are present on servers all across the world. This will reduce the “Time to first Byte” for your users because they don’t have to connect to the server your page is hosted, which could be at the other end of the world, or at least in another continent. Instead, the users will retrieve the data from their nearest CDN server. Netlify has their own CDN in place, while [Cloudflare](https://www.cloudflare.com/) is another great CDN I’m using.

Also, because your page is re-built every time you change something, you can always invalidate the cache **directly**. This is a huge win because cache-invalidation is actually a hard thing as some of you probably experienced already.

Last but not least, don’t forget one thing: Static HTML is faster than, or at least as fast as, dynamic HTML returned from your server.

### Cost

Jamstack also means cutting costs in most of the cases. No server means no server fees and also no server management needed. If you host your page, Netlify, this is **free** for a 100GB bandwidth soft limit per month. Also you can possibly reduce the resources needed for your APIs by transforming them into serverless functions.

## Nuxt as Static Site Generator

Most of you might know Nuxt.js as “the framework on top of Vue that can do server-side rendering”. For those of you who don’t know Nuxt.js at all yet, make sure to check out the [official website](https://nuxtjs.org/). But Nuxt.js is **way more than that**.

Sure, server-side rendering (SSR), is one part of it, but being a Static Site Generator is another. That means, it will take a “snapshot” of your pages and export them as HTML. I often describe it as the best of both worlds between a traditional single page application and a server-side-rendered project. While keeping the search engine optimization benefits provided by the HTML, you don’t need a Nuxt.js instance running all the time.

To generate the page, all you have to do is to run `nuxt generate`. A `dist` folder will appear with the HTML inside.

## Netlify

Before writing about how I moved three of my websites over to Netlify and Jamstack and what I experienced during that process, I want to give a rough overview of what Netlify actually is, what they are doing and why I chose them.

Netlify is an all-in-one platform for hosting static websites and a pioneer of the Jamstack tech. With Netlify, you can deploy your page in under a minute. No joke! They provide automatic deployments after commits to your Git repository or via webhooks, deploy previews for Pull Requests, form handling, serverless functions, A/B testing through different branches, one-click SSL, a CDN, a managed DNS and that all with a generous free tier.

## Experience reports

### lichter.io

My portfolio page was the first one I moved to Jamstack, as said in the beginning, and moving it to Netlify was a breeze. I switched to the `nuxt generate` command in my application to export my current Nuxt.js page as HTML files, connected my GitHub repository to Netlify, set up the correct build command and hit deploy. ? Tada, the page had been deployed! Now all I had left to do was pointing the domain to the correct spot and the new Jamstack-based page was up and running.

### thanks.lichter.io

With my [donation page](https://thanks.lichter.io) it was not _that_ easy because I had to think about how to manage the “donate” feature (using the Stripe API). Setting up a server just for that one function would be possible but a waste of resources. Why not giving Netlify Functions, a convenient wrapper around AWS Lambdas, a shot? As the code for the donation logic itself was always kind of “isolated”, transforming it into a serverless function was no big deal. After the “standard” procedure, converting the function, changing the URLs and testing it, thanks.lichter.io was ready as well.

### blog.lichter.io

The last experience report is about _this blog_. When I wrote the first lines of code for it I already puzzled my head over which approach I should take. Markdown files and a static blog or powered by an API? I decided for the latter because I wanted to have the option for more dynamics, like showing a “Trending Posts” section based on Google Analytics data. I built the API with Laravel (yes, PHP) and the frontend with Nuxt.js as you could already guess. The blog ran on server-side rendered for a long time because the Markdown coming from the API had to be parsed “on the fly”.

But the more I thought about in the last weeks, the more I was convinced that a Jamstack approach would work here as well. So I started to fiddle around. The transition took a bit longer than for the other pages but that was because of the size of the project and the dynamic data. What I did, in the end, was to set up webhooks that triggered a page rebuild when changing one of my articles or updating trending posts. Furthermore, I had to change my pagination from a query string based approach (`?page=2`) to a more URL-based approach (`/page/2`) as generated pages can’t take query strings into account very well. Besides that, there were no complications.

## When not to go for Jamstack

I haven’t ported all my projects to the Jamstack approach. Some of them, including [Brotli.pro](https://brotli.pro/), are relying too much on dynamic data and their near-real-time availability but still need the SEO benefits. In case you have a page where data could change every few seconds (or even faster) and where you need good SEO, I would not suggest going for Jamstack for that particular project. This does depend heavily on the situation and use case though.

## Netlify features I’m missing and why I still use Cloudflare

Though I switched over to Netlify, I still use Cloudflare in front of most of my pages. The Netlify CDN is excellent but Cloudflare provides a few features that Netlify doesn’t have at the moment and that I have to rely on.

### Brotli

Speaking of Brotli.pro, Netlify does not support the Brotli encoding yet. This feature [is planned](https://youtu.be/IWPDI01DsAo?t=1638) and will come to Netlify in the future but there is no ETA for it yet.

PS: If you don’t know what Brotli is, check out [the info page](https://brotli.pro/what)

### Analytics

**Update**: Netlify Analytics is available since a few months as a _paid feature_.

While more and more people are using anti-tracking measurements and ad blockers, it’s hard to get a unique visitors number close to reality when I’d only rely on client-side analytics. Cloudflare provides them and also gives more info regarding the country of the user. Whether these numbers are “more accurate” or including bots and crawlers, I’d love to see some analytics coming for Netlify.

### Essentially Broken HTTP2

While this is a thing that affects the majority of the CDNs right now, it’s still something I want to list. If you did not know yet, HTTP2 is essentially broken on many CDNs, including Netlify (to the time of writing). As this issue is a bit more complex, I won’t go into detail here. More information can be found on [this repository](https://github.com/andydavies/http2-prioritization-issues/)

## Conclusion

Jamstack, especially in combination with a custom API or a headless CMS\*\* is terrific. Easy deployments, no servers to worry about and a free performance boost. Thanks to Netlify for investing time and resources in this whole architecture and style. Netlify itself as a platform is steadily growing. The current features are solid and make the whole process of getting up and running with Jamstack very friction-less. A few things are missing here and there but they are mostly related to convenience or are planned in the future.

If you are building your next project, be it a side project or something for a client, you should consider taking this way. And if you are looking for a neat Static Site Generator, you know [my choice](https://nuxtjs.org/) now ?

Thanks for reading!

---

\* This isn’t possible in Nuxt (without the help of modules) at the moment but we are [working on it](https://github.com/nuxt/rfcs/issues/22).

\*\* Whoops, haven’t mentioned them a lot in this article. Maybe in a future one :wink:
