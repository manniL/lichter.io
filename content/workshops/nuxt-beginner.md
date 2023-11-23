---
title: "Nuxt.js Workshop: Crafting modern web apps"
description: "In this workshop, we will develop a real-life-like app using Nuxt.js - from creating the project to the final deployment. During this process we will take a look at various of the core features Nuxt.js offers and also show common pitfalls and how to avoid them."
time: "2 days"
topics:
  - nuxt
  - vue
onStartPage: true
---

Nuxt.js is an intuitive vue-based meta framework for building web applications &mdash; and it will make a developer’s life easier. The framework offers various rendering modes, including Server Side Rendering, Static Site Generation, ISG/ISR and hybrid modes, as well as more performance goodies out of the box like automatic code splitting and lazy-loading. With Nuxt you will make sure your front-end is production-ready quickly and comes with great performance by default.

In this workshop, we will develop a real-life-like app with Nuxt.js together, from creating the project to the final deployment. During this process we will take a look at many features Nuxt.js offers and also show common pitfalls and how to avoid them.

:toc

## Agenda

* Why Nuxt
  * What is Nuxt
  * Benefits of Nuxt
  * When to use Nuxt
  * Overview of the Nuxt ecosystem
* Vue Composition API (Refresher)
  * What is the Composition API
  * Composition vs. Options API
  * Reactivity
  * `<script setup>`
* Initializing the Nuxt Project
  * `nuxi` - Nuxt's CLI
* Exploring the directory structure
  * Initial Structure
  * `app.vue`
  * Further possible directories
* Routing in Nuxt
  * Pages with the `pages` folder
  * Dynamic Routes
  * Programmatic Navigation
* Configuring your Nuxt application
  * `nuxt.config.ts`
  * Overview of the most important options
* Layouts and Error Page
  * Using different layouts for different pages
  * Introducing a error page, e.g. for 404s
* Rendering Modes (Theory block)
  * Explaining the different rendering modes (SPA / SSR / SSG / ISG/ISR)
  * Showcasing them based on the app we are building
* Data Fetching
  * Introducing `useFetch` and `useAsyncData`
  * Explaining the data fetching lifecycle
  * Exploring options of the composables
  * `$fetch`
* Composables
  * Creating your own composables
  * Utilizing `useState`
  * Add VueUse to our project
* SEO
  * `useHead` and `useSeoMeta` composables
  * SEO based on rendering modes
* Runtime Config
  * Handling env variables
  * public vs. private runtime config
* Nitro
  * API routes
  * Server middleware
  * Type-safety
* Deployment
  * Deploying our page to Netlify
* Outlook
  * Further resources and topics that can be explored

## Target audience and requirements

This workshop is for developers who want to learn how to build web applications with Nuxt.js. It is not required to have any previous experience with Nuxt.js, but you should have a basic understanding of [Vue.js 3](/workshops/vue-beginner/), the [Vue Composition API](/workshops/vue-composition-api/) and [JavaScript](/workshops/javascript-beginner/).

## Format

This workshop is a **hands-on workshop**.

Instead of the typical workshop flow, you will work through the exercises before I'll teach you the theory and background. This way, you will learn the most important concepts of Nuxt.js by doing and not by listening or copying lines of code from the slides.

After each exercise, we will go through the solution and theory together, reinforcing what you have learned.
