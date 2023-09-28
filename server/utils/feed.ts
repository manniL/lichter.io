// Credits to https://github.com/harlan-zw/harlanzw.com/blob/main/server/routes/feed.xml.ts
import { Feed } from 'feed'
import * as cheerio from 'cheerio'
import { serverQueryContent } from '#content/server'
import type { H3Event } from 'h3'

export async function generateBlogFeed(event: H3Event) {
  const { url } = useRuntimeConfig().public.site
  // Fetch all documents
  const feed = new Feed({
    title: `Alexander Lichter | Blog`,
    id: url,
    link: url,
    language: 'en',
    image: `${url}/articles/__og_image__/og.png`,
    favicon: `${url}/img/logo/glyph-white-colored.svg`,
    generator: ';)',
    copyright: `Code licensed under MIT, written content licensed under CC-BY-NC-SA 4.0 - Alexander Lichter`,
    feedLinks: {
      rss: `${url}/feed.xml`,
    },
  })

  const posts = await serverQueryContent(event, 'articles').sort({ datePublished: -1 }).find()

  for (const post of posts) {
    if (post._path === '/articles')
      continue
    // this will return the SSR content of the post
    const content = await $fetch<string>(`${post._path}/`)
    let $ = cheerio.load(content)
    const prose = $('.prose').html()
    $ = cheerio.load(prose!)
    // remove all attributes from all elements
    $('*').each(function () {
      // @ts-ignore
      this.attribs = {}
    })
    const item = {
      title: post.title,
      id: `${url}${post._path}/`,
      link: `${url}${post._path}/`,
      description: post.description,
      content: $('body').html(),
      author: [
        {
          name: 'Alexander Lichter',
          link: url,
        },
      ],
      date: new Date(post.datePublished),
    }
    // TODO: Fix TS error
    // @ts-expect-error Whoops
    feed.addItem(item)
  }

  return feed
}
