const hasScrollBehaviorImplemented = 'scrollBehavior' in window.document.documentElement.style

export default async function () {
  if (hasScrollBehaviorImplemented) {
    return
  }
  const smoothScroll = await import('smoothscroll-polyfill')
  smoothScroll.polyfill()
}
