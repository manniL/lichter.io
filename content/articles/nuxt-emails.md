---
title: "Sending emails through Nuxt 2"
description: "Who can't relate to this: You've built a small portfolio page for someone (maybe a company, a friend or yourself) and the only API endpoint you'd need is one for a form. What now? In this article, I'll explain how to actually send emails and process forms..."
dateModified: "2020-04-18"
datePublished: "2018-08-14"
topics:
  - nuxt
  - javascript
  - email
---

Who can’t relate to this: You’ve built a small portfolio page for someone, maybe a company, a friend or yourself. And the only API endpoint you’d need is one for a form. What now? Scaffolding a new service just for this one endpoint?

Fear no more! It’s possible to send emails almost directly through Nuxt but only in SSR mode with a Node.js server running. No more additional API server necessary if you want to send a mail with data coming from a contact form.

Before diving into the implementation and ideas behind it, here is the [full source code](https://github.com/Developmint/developmint.de/blob/101cdec88918306e321a4d0b8ca1e40993db08d7/api/contact.js) I’m referring to through this blog post. It’s from my company’s website [developmint.de](https://developmint.de?ref=blog.lichter.io).

The main goal was a simple API endpoint accessible through Nuxt.js to handle the three contact form fields (_name_, _email_ and _message_) and to send an email with the data if everything is alright.

:toc

## Let’s get it on - serverMiddleware

While developing the [redirect-module](https://github.com/nuxt-community/redirect-module) for Nuxt 2, I came in touch with [serverMiddleware](https://nuxtjs.org/api/configuration-servermiddleware). Those run before the actual `vue-server-renderer` and are usually used for handling static assets, forcing HTTPS or, in case of [`redirect-module`](https://github.com/nuxt-community/redirect-module), rewriting routes.

But as they are highly customizable and flexible, why not use them as endpoints instead?

This is **possible**. An example middleware could look like this:

```js [api/test.js]
export default (req, res) => {
  res.write('Hey!')
  res.end()
}
```

When saved to `api/test.js` for example, you can then add it to your Nuxt config:

```js
export default {
  // ...
  serverMiddleware: [
    { path: '/api/test', handler: '~/api/test' },
  ],
  // ...
}
```

If you rebuild your project in dev mode (`yarn run dev`) and visit `/api/test`, you can see `Hey!` as the page content. **Great!**

We can use server middleware to serve content… But there must be a drawback, right?

**Right** one could think…

As Nuxt uses [connect](https://github.com/senchalabs/connect) as middleware layer (to reduce overhead as it suffices the complexity needed), we are missing some “critical” features in comparison to [express](https://github.com/expressjs/express).

Besides typical convenience features and routing (which isn’t even mandatory in our case), we can’t get the passed parameters from our `req` object at the moment. Without those, there is no content for our contact form mail. So what now?

We could use the [body-parser](https://www.npmjs.com/package/body-parser) package and apply it to the route before we use our custom middleware but then we’d face more “problems” like decoding JSON or setting headers “correctly” sooner or later. Likely it would work from a certain point on but there must be a better way. If we could just use _express_…

## Express in Nuxt.js?

Possibly you have heard it the other way: An express app with Nuxt.js as renderer (like in [express-template](https://github.com/nuxt-community/express-template)).

But **did you know** that you can use `express` inside a `serverMiddleware`?

```js
import express from 'express'
const app = express()

app.post('/', (req, res) => {
    // Validate, sanitize and send
})

export default {
  path: '/api/contact',
  handler: app
}
```

We declare the express app as the middleware handler and Nuxt is magically gluing everything together.

Now we can save this short snippet under `api/contact.js` and register our custom server middleware only as path string (because path and handler are inside).

```js
export default {
  // ...
  serverMiddleware: [
    '~/api/contact'
  ],
  // ...
}
```

## Still missing: the mailer

The last coding part might be less spectacular for everybody who already set up [nodemailer](https://github.com/nodemailer/nodemailer) in an express app.

_Fun fact_: Before this implementation I did not as I mostly write backends in Laravel (♥️).

### Inserting the body-parser

Since version 4.16.0, express has its own JSON middleware based on body-parser. To get our JSON parameters out of the POST body, we will need it:

```js
import express from 'express'
import nodemailer from 'nodemailer'

const app = express()

app.use(express.json())
// ...
```

### Validate and sanitize

Now we can get back to our `post` route. You may wonder why it’s declared as `/` instead of `/api/contact`. That’s because our `express` app’s base route is `/api/contact` (set through the `path` export).

```js
import express from 'express'
import validator from 'validator'
import xssFilters from 'xss-filters'

const app = express()

app.use(express.json())

app.post('/', (req, res) => {
  const attributes = ['name', 'email', 'msg'] // Our three form fields, all required

  // Map each attribute name to the validated and sanitized equivalent (false if validation failed)
  const sanitizedAttributes = attributes.map(n => validateAndSanitize(n, req.body[n]))

  // True if some of the attributes new values are false -> validation failed
  const someInvalid = sanitizedAttributes.some(r => !r)

  if (someInvalid) {
    // Throw a 422 with a neat error message if validation failed
    return res.status(422).json({ 'error': 'Ugh.. That looks unprocessable!' })
  }

  // Upcoming here: sending the mail
})
```

Let’s take a look at the `validateAndSanitize` function. It could be replaced with another express middleware or plugin but why not writing our own this time:

```js
const rejectFunctions = new Map([
  [ 'name', v => v.length < 4 ],
  [ 'email', v => !validator.isEmail(v) ],
  [ 'msg', v => v.length < 25 ]
])
const validateAndSanitize = (key, value) => {
  // If map has key and function returns false, return sanitized input. Else, return false
  return rejectFunctions.has(key) && !rejectFunctions.get(key)(value) && xssFilters.inHTMLData(value)
}
```

Each possible attribute receives a `rejectFunction` that defines in which case the validation will fail. If the function returns false, the validation passed. It looks weird first but I like the reversed approach here because we can avoid a cascade of `if`s.

### Send it out

After validating and sanitizing, we are confident that we can send the mail out!

```js
import express from 'express'
import nodemailer from 'nodemailer'
import validator from 'validator'
import xssFilters from 'xss-filters'
// ...

app.post('/', (req, res) => {
  // ...

  if (someInvalid) {
    return res.status(422).json({ 'error': 'Ugh.. That looks unprocessable!' })
  }

  sendMail(...sanitizedAttributes)
  res.status(200).json({ 'message': 'OH YEAH' })
})
```

We use the ES6 spread syntax to pass the sanitized values to the `sendMail` function:

```js
const sendMail = (name, email, msg) => {
  const transporter = nodemailer.createTransport({
    sendmail: true,
    newline: 'unix',
    path: '/usr/sbin/sendmail'
  })
  transporter.sendMail({
    from: email,
    to: 'support@developmint.de',
    subject: 'New contact form message',
    text: msg
  })
}
```

Inside we create a nodemailer transporter and send the email out. We could do this through `SMTP`, other providers (e.g. SES) or (classically) through `sendmail` as I did. If you want to know more about the setup of nodemailer, [here you go](https://nodemailer.com/transports/sendmail/).

## Finally we can send emails - A conclusion

So, we did it! If we now send a POST request (e.g. with `axios`) through our form, the email will be sent.

**Was it worth it?** - **Definitely!** Instead of blocking another port for such a simple API, we can run it together with our Nuxt server (in SSR mode).

**Should I adapt my whole API to leverage Nuxt server middleware now?** - You could do this, but I would rather **not recommend it**, as pointed out in a [recent article](/articles/nuxt-with-an-api/). It’s a great solution for simple and small APIs, but as soon as complexity or the request count increases, better go with own API servers (not only because of performance, also because of better scalability and no “single point of failure”).

## Closing remarks

I hope you enjoyed the article! If so it’d be cool if you could spread the word ☺️

**Questions left? Critics?** Hit me up on Twitter ([@TheAlexLichter](https://twitter.com/TheAlexLichter)) or write me a mail (blog at lichter dot io). I’m curious to hear from you!
