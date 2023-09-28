---
title: "What to do when Vue 2 hydration fails"
dateModified: "2020-05-02"
datePublished: "2020-04-14"
description: "SSR is amazing but also comes with errors you might have not seen before. Especially one problem still boggles lots of minds: When Vue Hydration fails. In this article we will take a look at possible reasons, explain what the error means and how to fix it."
topics:
  - vue
  - nuxt
  - ssr
  - jamstack
  - hydration
---

Server-side rendering in Vue has lots of benefits. Especially with frameworks like Nuxt.js or Gridsome, developing SSR Vue applications is a breeze, no matter if you use dynamic SSR or static site generation. But on the other hand, server-side rendering also comes with a fair increase of complexity and errors you might have not seen before. While most of them are documented and workarounds are available, one error still boggles lots of minds: When **Vue hydration fails**.

In this article we will take a look at possible reasons, explain what the error means and furthermore go through solutions and debugging opportunities:

:toc

## What is Vue Hydration?

When I heard the term _Hydration_ for the first time, it felt very abstract to me and I couldn’t think of the meaning. Eventually, I realized it’s not as complex as the term sounds at first:

> _Hydration is the process where Vue is transforming server-side rendered markup and makes it reactive so it can reflect dynamic changes from Vue._

If Vue is expecting a different markup compared to the rendered HTML, the **hydration will fail** (also called “Vue will bail hydration”). You can read more in the [official Vue SSR docs](https://ssr.vuejs.org/guide/hydration.html) about it.

## How to recognize failing hydration

We now know what hydration is and when it fails. But how can we developers discover that hydration did not work as expected? Well, there are two error messages which definitely point to failing hydration but both come with constraints.

The first one appears **only in development** regardless of the mode:

```sh
Parent:  <div class="container"> client-hook-3.js:1:16358
Mismatching childNodes vs. VNodes: NodeList(3) [ p, p, p ]  Array [ {…} ]
    
[Vue warn]: The client-side rendered virtual DOM tree is not matching server-rendered content.
This is likely caused by incorrect HTML markup, for example nesting block-level elements inside <p>, or missing <tbody>. 
Bailing hydration and performing full client-side render.
```

The second error message shows up **only in production** and when using **static site generation**:

```sh
Error: [nuxt] Error while mounting app: HierarchyRequestError: Failed to execute 'appendChild' on 'Node':
This node type does not support this method. at some-file.js:1
```

As we know, hydration only happens when the page is rendered by the server in the first place, so usually only on the initial request to your application.

This makes it even more difficult to spot hydration problems because they are not visible when navigating between pages through a `<AppLink>` but only on a hard reload.

Thus, hydration errors are sometimes only discovered on the staging system or worse - only in production. And in rare case, there isn’t even a console error logged but some components simply stop working.

## Common Causes

Now that we know how to spot failing hydration we will look into typical causes for Vue to bail hydration. We can’t cover every possible reason because they vary a lot and depend a lot on your code.

For the upcoming chapters, every time the _server_ or _server-side_ is mentioned, it is relevant for both scenarios - dynamic SSR and static site generation - as both have technically a server rendering content (unless stated otherwise).

### Invalid HTML

Invalid HTML is the first thing you should check for when the hydration error pops up. This is also what one of the error messages suggest.

> `This is likely caused by incorrect HTML markup, for example nesting block-level elements inside <p>, or missing <tbody>`

Unfortunately, invalid HTML is often **not the reason** for the failing hydration. Nevertheless, you should double-check your markup. Also make sure you check your minification settings, as aggressive HTML minification could lead to invalid HTML.If you have user-generated output or content coming from a CMS, it’s worth verifying that this content is valid HTML too. Finally, also third-party plugins or services could influence and manipulate the HTML. A common example for the latter is Cloudflare, when you’ve enabled their services like HTML minification, the “Rocket loader” or other features altering the page content.

I’ve created a simple [example codesandbox](https://codesandbox.io/s/codesandboxnuxt-oqqsj?module=%2Fpages%2Fhydration-html.vue&theme=dark) containing invalid HTML and triggering a hydration failure.

### Scripts altering the HTML

Talking about scripts: If you have added third party javascript files to your Vue application, these can also alter the HTML (e.g. by embedding a form) before Vue can take over and hydrate the HTML coming from the server.

### Different state on the server and client

Having a different state on the server and client is the most common reason for hydration. As usual, reasons for the inconsistencies can vary a lot.

#### Dates, Timestamps, and Randomizing

When you include dates or timestamps on your website you should be careful and make them as _static_ as possible, especially if your site is generated statically. If the client evaluates an expression like `new Date()` it will likely be different than the date generated on your server when it retrieved the same date during deployment. This also [bit me on my company’s about page](https://5c76f0cdea86f80008727fdf--developmint.netlify.com/about-us/) where I wanted to shuffle the order of the people displayed based on the current minute.

```js
export const deterministicRotate = (arr) => {
  if (arr.length <= 1) {
    return arr
  }
  const rotations = (new Date()).getMinutes() % arr.length

  return rotations ? arr : arr.reverse()
}
```

The plan was to reverse the array if the minute where the user opened the page is odd. That worked very well when using dynamic SSR. But when switching to a JAMstack site which is statically generated, the feature turned into a bug. You can try it out by clicking on the link above and refresh after a minute. What happens is that names and text of the people are swapped correctly but the images stay the same. **Horrible!** And it happens because of the date mismatch between the server and the client. After [removing the deterministic shuffle code](https://github.com/Developmint/developmint.de/commit/d6db09833c9a2b4e0b2bcdfa9e4bdc93a2e27cf3#diff-9aa1b4d61222a570d303632c7712e59b) everything worked again as usual.

#### Authentication

Another common reason for inconsistencies is user authentication. This applies to both, dynamic SSR and static site generation.

When storing the authentication state only on the client side (e.g. in the localStorage), the server “does not know about the authentication”. This will inevitably lead to hydration issues because the server and client information is fundamentally different when you are logged in. Thus, you should not render any authentication-related component on the server-side if the server is not aware of the authentication state **or your are generating your page statically**.

You may wonder why it always applies to static sites: Because when you generate your site, it’s HTML and serialized code is “stateless”. We can’t take the “logged in user state” into account during the build phase. This means you have to exclude all authentication-related components from rendering on the server.

#### And there is still more

Besides these two scenarios, there are even more edge cases that could hit you and cause inconsistencies. Even if it’s not listed here, we will solve the hydration error! At first, we will narrow it down to the DOM element causing the problem.

## Solving the hydration failure

### Find the element causing the hydration error

To narrow down the problem to a specific component or DOM element we can use the devtools of your favorite browser!

#### Setting up the debuggers

1. Ensure you are in dev mode
1. Open up the DevTools (usually by pushing F12)
1. Trigger a hydration warning (usually by reloading the site)
1. Unfold the `[Vue Warn] The client side ...` error message to see the stack trace (depending on the browser, also unfold the “VueJS” list popping up)
1. Click on one of the `hydrate` calls. This will open up the source code of Vue’s hydration function.
1. Now, set a debugger whenever the function returns `false`. By the time of writing, this happens three times:

```js
if (process.env.NODE_ENV !== 'production') {
  if (!assertNodeMatch(elm, vnode, inVPre)) {
      return false //HERE
  }
}


    if (process.env.NODE_ENV !== 'production' &&
          typeof console !== 'undefined' &&
          !hydrationBailed
    ) {
        hydrationBailed = true;
        console.warn('Parent: ', elm);
        console.warn('server innerHTML: ', i);
        console.warn('client innerHTML: ', elm.innerHTML);
    }
  return false //HERE
}


  if (process.env.NODE_ENV !== 'production' &&
      typeof console !== 'undefined' &&
      !hydrationBailed
  ) {
    hydrationBailed = true;
    console.warn('Parent: ', elm);
    console.warn('Mismatching childNodes vs. VNodes: ', elm.childNodes, children);
  }
  return false //HERE
}
```

#### Time to debug

1. Last but not least, let the hydration error appear again. Often, this is possible by reloading the page again but sometimes it’s more difficult.
1. You now see that one of our breakpoints was triggered and script execution is stopped
. Now open the DevTool’s console and write `elm` to get the DOM element where hydration fails. With the DOM element, you 1should be able to trace back the hydration error to one of your Vue components
1. Continue with the next steps

PS: This is an adapted workflow of [this StackOverflow answer](https://stackoverflow.com/a/49202327/3975480) by user budden73.

### Ensure your HTML is valid

Now that you found the code causing the problem, the first thing you should do is to verify that your markup (possibly coming from an API) is valid. Code like `<p><p>Text</p></p>` is not valid because a `p` element doesn’t allow other block elements (like a paragraph tag) inside.

Be aware, that `<span>` tags are not allowed to have block level elements like `<div>` or `<p>` as children. These `<span>` tags are used default tag for Vue’s transitions though. You can change that though via `<Transition tag="div">`.

### Resolving state inconsistencies between server and client

During the debugging, you were able to take a look at the results from the server and the (re-rendered) client-side part. If these are different, you can take a look at how you fetch data and what you render on the server/client-side. One common issue is authentication for static pages. Because the HTML generated at build time is _stateless_, thus not knowing about any authentication state, all parts of your application that are related to authentication should only be rendered on the client-side. Otherwise, the client, which has the authentication status of the user, expects different HTML from the server because the user is logged in. Then there is only one option left…

### Final escape hatch: `<ClientOnly>`

The last option to resolve hydration errors is to avoid them at all for the component. This is mandatory for authentication-related components on statically generated pages and sometimes also for components delivering content you can’t change but must embed, e.g. from 3rd party applications.

As we have learned at the beginning of the post, hydration only happens when the component is rendered on both, client and server side. To avoid hydration, we avoid rendering the component on the server-side by wrapping it in a `<ClientOnly>` tag.

The only drawback: The component is not included in the HTML returned by the server and not helpful for SEO.

## Conclusion

Let’s wrap it up! Now you know more about:

* What hydration is and what it does
* How hydration can fail and how to spot hydration errors
* Common reasons for bailed hydration
* How to debug _your_ hydration error and fix your application

I hope that this post was insightful and you’ve learned a thing or two. Are you experiencing causes for hydration errors I haven’t described here or did I miss a common reason? Feel free to **message me** on Twitter or by mail.

And as usual - I’d be glad if you could spread the word and share the blog post with colleagues ?

See you around!
