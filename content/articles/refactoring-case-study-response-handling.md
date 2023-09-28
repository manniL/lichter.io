---
title: "Refactoring code - A case study (#1 - Response handling)"
description: "Recently I stumbled upon a very interesting code sample which I had to review. As I'm a huge clean code advocate, I'll dissect the small code piece with you and explain several techniques that help to write clean, human-readable and maintainable code."
dateModified: "2020-04-18"
datePublished: "2018-08-14"
topics:
  - javascript
  - clean-code
  - refactoring
---


_Remark: The following advice and techniques are valid for many languages, not only Javascript! Also be aware that the upcoming information is opinionated._

**Update (19.08.2018):** Improved the code by using _Map_

:toc

## Introduction

I held a code review on a clients project recently, as usual when the team has been implemented a new feature. The code was ‘working’, but far from optimal because a naive approach has been taken. This is totally fine, as reviews are for such situations. But after writing code I suggest to look over it once again and to refactor it _on the fly_ (after the tests are passing).

Let me outline the context for the code:

Think about taking a course or participating in a seminar. After people have signed up for such a seminar, they receive an email with a _confirmation link_. After confirming that they are participating, they get a _confirmation mail_ with a link to _cancel_ the participation. Both links will call a website, which calls then an API with the submitted tokens. The response of this API call is the condition for the text that will be displayed on the website. Then our function comes in. **It will return the text shown depending on the API response**. Also, it is a _pure function_ (no side-effects). Catching request errors has been done before.

## Initial code

Now here goes the code. Try to **read over it just once**:

```js
const evaluateResponseOld = response => {
  let text = ''
  if (response.valid) {
    if (response.type === 'Confirmation') {
      if (response.used) {
        text = 'This token has already been used'
      } else {
        text = 'Thanks for your subscription'
      }
    } else if (response.type === 'Cancellation') {
      if (response.used) {
        text = 'This token has already been used'
      } else {
        text = 'You have been unsubscribed successfully'
      }
    }
  } else {
    text = 'The provided code is invalid'
  }
  return text
}
```

### Problems of the initial code

Were you able to find out all the different cases and returns after one read? I _wasn’t_ back then, though I read code every day.

#### High cognitive load

So, as you likely have recognized, the code is unnecessarily complex and has, therefore, a high cognitive load. You always have to remember which condition was fulfilled. Also, the `text` variable is mutable, so you’d have to think about its state as well. In this case, it’ll only be set once, but imagine more complex functions.

#### Difficult Maintainability

Now imagine that an additional state must be handled because the API will respond to another scenario now (for example `Cancellation`, `Confirmation` and `Pending`). It will take some time to add the state and furthermore you have to duplicate a lot of code (see `response.used` in the current code). Which leads me to…

#### Code duplication

Code duplication per se is better than a wrong abstraction but in this case the code is unnecessarily duplicated and therefore more error-prone. Think about you have to change `used` to `invalid` now. If you miss one `if` statement, the code won’t work. Fortunately, your tests will tell you (if you have such…).

## Iterations

So… how can we do better? We will look into some techniques I use to transform this code in a more readable snippet. It only takes six small iterations!

### First iteration - Remove temporary variables

#### Motivation

So, why should we remove temporary variables from the code (as far as possible)? Well, first of all, it reduces cognitive load. When almost all variables are immutable (or no variables exist), you don’t have to think about their state! In our scenario, we can even omit the `text` variable completely as the function will **always return text** and no side-effects are included.

#### Code

```js
const stepOne = response => {
  if (response.valid) {
    if (response.type === 'Confirmation') {
      if (response.used) {
        return 'This token has already been used'
      } else {
        return 'Thanks for your subscription'
      }
    } else if (response.type === 'Cancellation') {
      if (response.used) {
        return 'This token has already been used'
      } else {
        return 'You have been unsubscribed successfully'
      }
    }
  } else {
    return 'The provided code is invalid'
  }
}
```

### Second iteration - Invert guarding if-statements

#### Motivation

Guarding `if`s are, as the name might hint `if` conditions around a larger sub-block. They are _guarding_ the code with their condition so that it will only execute when the `if` evaluates to true. No bad thing in general, but nested guarding ifs lead to increased cognitive load and unwanted complexity. Instead, we can **invert the condition** and insert an **early return**.

#### Code

```js
const stepTwo = response => {
  if (!response.valid) {
    return 'The provided code is invalid'
  } else {
    if (response.type === 'Confirmation') {
      if (response.used) {
        return 'This token has already been used'
      } else {
        return 'Thanks for your subscription'
      }
    } else if (response.type === 'Cancellation') {
      if (response.used) {
        return 'This token has already been used'
      } else {
        return 'You have been unsubscribed successfully'
      }
    }
  }
}
```

### Third iteration - Remove else

#### Motivation

Okay, this might be a bit controversial but I usually consider **`else` as a code smell**. If you use early returns and return in each nested block, they won’t give you any value. There are some situations though where `else` is perfectly fine.

Normally I’d replace all `else if`s with `if`s as well but to make the next iteration more obvious we will keep them to signalize that the conditions are related to each other.

#### Code

```js
const stepThree = response => {
  if (!response.valid) {
    return 'The provided code is invalid'
  }

  if (response.type === 'Confirmation') {
    if (response.used) {
      return 'This token has already been used'
    }
    return 'Thanks for your subscription'
  } else if (response.type === 'Cancellation') {
    if (response.used) {
      return 'This token has already been used'
    }
    return 'You have been unsubscribed successfully'
  }
}
```

### Fourth iteration - Deal with duplications in the logic

#### Motivation

Now we should focus on the “leftovers”. As the code is more readable we can take a look and find possible duplicates in the code branches.

If we look over our transformed code we now see clearly that the `response.used` condition is **independent** of the `response.type`. This means we can extract this part and move it _one scope up_, which makes the condition to another inverted guarding `if`.

#### Code

```js
const stepFour = response => {
  if (!response.valid) {
    return 'The provided code is invalid'
  }

  if (response.used) {
    return 'This token has already been used'
  }

  if (response.type === 'Confirmation') {
    return 'Thanks for your subscription'
  } else if (response.type === 'Cancellation') {
    return 'You have been unsubscribed successfully'
  }
}
```

### Fifth iteration - Lookup table

#### Motivation

One criterion was that we should be able to add new response states easily. To do this, we should minimize the code we would need for it. Currently, we’d have to add another `if`, another comparison and a return statement. Doesn’t seem that much, but again, think about more complex functions.

To reduce the changes when adding a `type` (f.ex. _Pending_) and the text that should be returned, we’ll transform our control flow from an `if-else-if` structure into a lookup table. This works well if you have the **same comparison method again and again** (in our case triple equals) in your conditions.

We will create a `lookup` object and fill it with the response types which will act as the keys, together with the corresponding text as a value so we can dynamically access the text based on the response type. To add a new type/state we only have to add what has _really changed_: The new type and the related text.

#### Code

```js
const stepFive = response => {
  if (!response.valid) {
    return 'The provided code is invalid'
  }

  if (response.used) {
    return 'This token has already been used'
  }

  const responseLookup = {
    Confirmation: 'Thanks for your subscription',
    Cancellation: 'You have been unsubscribed successfully'
  }

  if (responseLookup.hasOwnProperty(response.type)) {
    return responseLookup[response.type]
  }
}
```

You could also use a `Map` to increase the lookup speed (thanks to [Adrien Baron](https://twitter.com/BaronAdri) for the hint). 

```js
const stepFiveWithMap = response => {
  if (!response.valid) {
    return 'The provided code is invalid'
  }

  if (response.used) {
    return 'This token has already been used'
  }

  const responseMap = new Map([
    ['Confirmation','Thanks for your subscription'],
    ['Cancellation','You have been unsubscribed successfully']
  ])

  if (responseMap.has(response.type)) {
    return responseMap.get(response.type)
  }
}
```

Placing the lookup object outside would also be viable as long as the lookup object don’t change through the function. This makes your function _impure_ though, because it’ll then depend on an outside object and not only on it’s inputs.

To solve this, you could take both parameters (the `response` and the `lookupObject`) or create a higher order function, taking a `lookupMap` first, which will make your function easily reusable. A **higher order function** is a function that returns a function again. The implementation would look like this:

```js
const responseMap = new Map([
  ['Confirmation', 'Thanks for your subscription'],
  ['Cancellation', 'You have been unsubscribed successfully']
])

const higherOrderStepFiveWithMap = lookupMap => response => {
  if (!response.valid) {
    return 'The provided code is invalid'
  }

  if (response.used) {
    return 'This token has already been used'
  }

  if (lookupMap.has(response.type)) {
    return lookupMap.get(response.type)
  }
}

const stepFiveWithMap = higherOrderStepFiveWithMap(responseMap)

// Now use stepFiveWithMap(yourResponseObject)
```

While I’d prefer this version because of the reusability, purity and low coupling, let’s stick to the simple and impure map version:

```
const lookupMap = new Map([
  ['Confirmation', 'Thanks for your subscription'],
  ['Cancellation', 'You have been unsubscribed successfully']
])

const simpleAndImpureStepFiveWithMap = response => {
  if (!response.valid) {
    return 'The provided code is invalid'
  }

  if (response.used) {
    return 'This token has already been used'
  }

  if (lookupMap.has(response.type)) {
    return lookupMap.get(response.type)
  }
}
```

### Sixth iteration - Invalid state

#### Motivation

Alright! The code looks readable, has no duplication and is easily maintainable. One thing is missing though: Handling invalid states. Even if you think that this will never ever happen, it won’t hurt to throw an error if it does. In the best case, your monitoring/reporting tool will pick it up and tell you. It’s worth to write tests for invalid states as well, especially when it comes to user input!

#### Code

```js
const lookupMap = new Map([
  ['Confirmation', 'Thanks for your subscription'],
  ['Cancellation', 'You have been unsubscribed successfully']
])

const simpleAndImpureStepFiveWithMap = response => {
  if (!response.valid) {
    return 'The provided code is invalid'
  }

  if (response.used) {
    return 'This token has already been used'
  }

  if (lookupMap.has(response.type)) {
    return lookupMap.get(response.type)
  }

  throw new Error('Invalid state while evaluating response')

  /*
    we could also 'shorten' that a little with short-circuit:

    const invalid = () => { throw new Error('Invalid state while evaluating response') }

    return lookupMap.get(response.type) || invalid()
  */
}
```

## Wrapping it up

**We did it!** Before wrapping everything up, let’s compare the initial and the final code:

**Initial code**

```js
const evaluateResponseOld = response => {
  let text = ''
  if (response.valid) {
    if (response.type === 'Confirmation') {
      if (response.used) {
        text = 'This token has already been used'
      } else {
        text = 'Thanks for your subscription'
      }
    } else if (response.type === 'Cancellation') {
      if (response.used) {
        text = 'This token has already been used'
      } else {
        text = 'You have been unsubscribed successfully'
      }
    }
  } else {
    text = 'The provided code is invalid'
  }
  return text
}
```

**Final* code*

```js
const lookupMap = new Map([
  ['Confirmation', 'Thanks for your subscription'],
  ['Cancellation', 'You have been unsubscribed successfully']
])

const simpleAndImpureStepFiveWithMap = response => {
  if (!response.valid) {
    return 'The provided code is invalid'
  }

  if (response.used) {
    return 'This token has already been used'
  }

  if (lookupMap.has(response.type)) {
    return lookupMap.get(response.type)
  }

  throw new Error('Invalid state while evaluating response')
}
```

## Conclusion

As you see, the final code is has a maximum depth of one (previously four), only three branches (previously five) and is _even shorter_ than the initial one (five source lines of code less). The cyclomatic complexity, which measures the amount of independent paths the function can take on execution, decreased by two.

The techniques utilized in a nutshell:

1.  Remove temporary variables and try to avoid shared state where you can
2.  Invert guarding ifs and use early returns to reduce cognitive load and complexity/depth
3.  Remove else if you always return early
4.  Find and deal with duplicated code in leftover logic
5.  Use a lookup table/lookup object when you can
6.  Proper handling of invalid state

I hope you liked the content! If so it would be neat if you could spread the word (f.ex. with the buttons below).

**Questions left? Critics? What is your opinion on those techniques?**

Hit me up on Twitter ([@TheAlexLichter](https://twitter.com/TheAlexLichter)) or write me a mail (blog at lichter dot io).