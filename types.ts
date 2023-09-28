import type { ParsedContent } from "@nuxt/content/dist/runtime/types/index.js"

type ParsedContentPreview = Omit<ParsedContent, 'body' | 'excerpt'>

type TalkBase = {
  title: string
  eventName?: string
  location?: string
  date: string
  eventUrl?: string
  slidesUrl?: string
  videoUrl?: string
  podcastUrl?: string
  type: 'talk' | 'podcast'
  topics: string[]
}
export type Talk = TalkBase & ParsedContent
export type TalkPreview = TalkBase & ParsedContentPreview

type ArticleBase = {
  title: string
  dateModified: string,
  datePublished: string,
  imageSrc?: string,
  imageAlt?: string,
  topics: string[]
} 

export type Article = ArticleBase & ParsedContent
export type ArticlePreview = ArticleBase & ParsedContentPreview