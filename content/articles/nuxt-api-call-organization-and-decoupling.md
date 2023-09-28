---
title: "Organize and decouple your API calls in Nuxt 2"
description: "As your Nuxt app grows, so does your backend. With time, your API evolves from a hand full of endpoints into an enormous jungle of resources. And you want to stay the king of the jungle! Learn to organize and abstract your API resources in this post."
dateModified: "2022-12-06"
datePublished: "2018-11-22"
topics:
  - nuxt
  - api
  - javascript
---

As your Nuxt app grows, so does your backend. With time, your API evolves from a hand full of endpoints into an enormous jungle of resources. And you want to stay the king of the jungle! That means not losing track of the different (RESTful) endpoints and organizing them properly. Imagine you want to rename a resource called `images` to `photos`. Nothing could be worse than doing a find and replace and using all your brainpower to not miss a call and avoid renaming other variables by accident. Or think about when you’d have to add another header for your Authentication.

So, a decent organization of your API calls in your frontend is necessary to stay sane. But how do we do that with Nuxt 2?

:toc

## The two sides of the Nuxt coin

With Nuxt it seems to be bit more complicated to properly organize your API requests because you have to think about the _server side_ in addition to the client side. You will probably retrieve data from your backend in `asyncData` or `fetch` methods, in the Vuex store or simply inside a Vue component. That means, our solution has to be accessible in all these _contexts_ ?

## The Nuxt axios module

If you are not using the [official Nuxt axios module](https://github.com/nuxt-community/axios-module/) by now, you should really switch over soon (read: **now**). Instead of importing axios everywhere, the module provides you a convenient interface on the client-side (`this.$axios` in Vue components), in the Nuxt context (`ctx.$axios`) that is available in functions like `asyncData` and `fetch` and in the Vuex store (`this.$axios` again but not in arrow functions!). Furthermore, you can set up default headers, a `baseURL` depending on your environment and if necessary you can tweak your axios instance even more. Plus, you have a [shorthand function](https://axios.nuxtjs.org/helpers#fetch-style-requests) for all HTTP verbs (eg. `$get`) which lets you omit the nested `data` key and delivers the response object on the top level.

But is that it? Of course not! We found a way to centralize our configuration but that’s just one part of the puzzle.

## Abstracting our REST API

Now the interesting part begins. For further context, a _RESTful_ API will be assumed. The techniques in the following paragraphs will work for most of the APIs though but have to be adapted slightly.

For our example, we will use parts of the [JSON Placeholder API](https://github.com/typicode/jsonplaceholder#available-resources) as it covers all HTTP verbs and is not too complex.

Let’s take a look at the `posts` resource. What you want to do with it is:

* _Create_ a post
* _Show_ details of a specific post (eg. title and content)
* Show an overview of (all/some) posts, also called a post _index_ (often used on an _index_ page as well)
* _Update_ a post
* _Delete_ a post

If we consider other resources, for example `users`, the pattern will repeat:

* _Create_ a user
* _Show_ a user’s details (for example on his profile page)
* Show a list/an _index_ of all users (member list)
* _Update_ a user
* _Delete_ a user

With this knowledge, we can try to abstract our API with a Plain Old Javascript Object (**POJO**) by creating a method for each _verb_. A `class` would be fine as well.

The design pattern we borrow us here is called **Repository Pattern**.

Let’s save this file to `~/api/repository.js`.

```js [~/api/repository.js]
export default {
  create(payload) {},

  show(id) {},

  index() {},

  update(payload, id) {},

  delete(id) {}
}
```

Okay, so we have a basic scaffold for our API abstraction though we still have to fill the methods somehow. Now the `$axios` from the Nuxt axios module comes in handy. But… how can we add it to an external module? Trying to access `this.$axios` will fail.

## Dependency Injection to the rescue

Another term crosses our way: `Dependency Injection`. It’s a very common pattern in object oriented languages like PHP or Java and will help us in our situation as well.

If you are **depending on a library** like axios you usually would import and use it like this:

```js
import axios from 'axios'

export default {
  async index() {
    const result = await axios.get('...')
    return result.data
  }
}
```

This is fine for many use-cases, but for that one, the approach comes with several disadvantages:

* You can’t easily swap out the implementation for another one if you want to
* The dependency has to be known before runtime

While the former isn’t a huge issue in our case, the latter poses a problem for us. We _know_ the dependency but we can’t actually `import` it.

Instead, we **inject the dependency** which means we pass it as a parameter in a function (or to the constructor if you are using a `class`).

```js
export default axios => ({
  async index() {
    const result = await axios.get('...')
    return result.data
  })
}
```

Boom, **dependency injected**! Let’s fill out our original scaffold and make use of the `$axios` shorthands:

```js [~/api/repository.js]
export default $axios => ({
  index() {
    return $axios.$get('/posts')
  },
  create(payload) {
    return $axios.$post(`/posts`, payload)
  },
  show(id) {
    return $axios.$get(`/posts/${id}`)
  },
  update(payload, id) {
    return $axios.$put(`/posts/${id}`, payload)
  },
  delete(id) {
    return $axios.$delete(`/posts/${id}`)
  }
})
```

## Generalize our implementation

Okay, so far so good. Currently, the `posts` resource is still hardcoded into our methods. To increase the reusability we want to pass in the resource URL dynamically again.

Instead of adding a second parameter to our default export we will transform the function to a _higher order function_ (a function that returns a function):

```js
export default $axios => resource => ({
  index() {
    return $axios.$get(`/${resource}`)
  },
  // ...
}
```

Now when we import our function somewhere, we can reuse it for many resources, but we only need to pass in the axios instance once:

```js
import createRepository from '~/api/repository.js'

// First, call the function with the axios object

const $axios = getAxiosMagicallyFromSomewhere // we will find out how to get it further down the road
const repositoryWithAxios = createRepository($axios)

// Now you can create repositories and re-use the `repositoryWithAxios` function

const postRepository = repositoryWithAxios('posts')
const userRepository = repositoryWithAxios('users')
// ...
```

With this pattern, you don’t have to pass in the options again and again.

## Leverage the power of Nuxt.js plugins

There we go. We have abstracted our API resources successfully and found a way to re-use that abstraction properly, but two problems are still unsolved.:

* How can we **access** the abstraction throughout our Nuxt app?
* How can we properly **pass in** the axios instance from the Nuxt module?

To solve both problems at once we utilize a **Nuxt.js plugin**. They are mostly used to add global Vue components or libraries but can be used in many other ways too. Also, they are evaluated before creating the root Vue instance.

Okay, let’s create a file at `~/plugins/repository.js`.

If the plugin has a default export function, two parameters will be passed to that function: The **Nuxt context** and a method called `inject`.

```js [~/plugins/repository.js]
import createRepository from '~/api/repository.js'

export default (ctx, inject) => {
  // Here we will do it
}
``` 

Inside the function, we have everything we need to make our API repositories available across all relevant parts of our Nuxt app and to pass the axios instance to our construct.

### Passing in the axios instance

Because the context is available in the plugin default export method, we can pass in the axios instance without any problems:

```js [~/plugins/repository.js]{4,7-8}
import createRepository from '~/api/repository.js'

export default (ctx, inject) => {
  const repositoryWithAxios = createRepository(ctx.$axios)

  const repositories = {
    posts: repositoryWithAxios('posts'),
    users: repositoryWithAxios('users')
    //...
  }
}
``` 

### Inject it

Now the last (and mightiest) step has to be taken. Make the implementation available across our app so it can be used in components, `asyncData` and so on. The good thing is, we don’t have to implement this on our own. It will be handled completely by the `inject` method which is provided as the second argument to the plugin function:

```js [~/plugins/repository.js]
import createRepository from '~/api/repository.js'

export default (ctx, inject) => {
  const repositoryWithAxios = createRepository(ctx.$axios)

  const repositories = {
    posts: repositoryWithAxios('posts'),
    users: repositoryWithAxios('users')
    //...
  }

  inject('repositories', repositories)
}
``` 

`inject` takes a name (used as key with `$` prefix) as the first argument and the value of that key as the second argument, which can be a primitive, an object or a function.

Then `inject` will:

* Add the key-value pair to the Vue prototype (so `this.$key` can be used in components and store
* Add the key-value pair to the `ctx.app` object (so it can be used in `asyncData`, `fetch` and so on)

## Use it

We’ve completed our whole setup, so the only thing left is to actually use it. I’ve built a small [live demo with CodeSandbox](https://codesandbox.io/s/github/manniL/nuxt-decouple-and-organize-api-calls) so you can directly play with it.

Make sure to check out the [Vue API query](https://github.com/robsontenorio/vue-api-query) plugin by Robson Tenório which provides an advanced query builder for your API. That package can definitely save you some work!

## Conclusion

Using an API repository to organize your calls is a mighty tool to keep track of your endpoints, call them uniformly, reduce duplicate code and also to have an easier time debugging or changing them!

The idea of injecting objects in the context and injecting other dependencies in a Nuxt plugin is a recurring pattern that can be used in a variety of scenarios. Keep that one in mind!

Still have questions? No problem, tweet me at [@TheAlexLichter](https://twitter.com/TheAlexLichter), reach out on the Vue/Nuxt Discord or write me a mail (blog at lichter dot io).

Have you learned something by reading this post? Awesome, then I’ve reached my goal ? Also, please **spread the word** if you liked the article!
