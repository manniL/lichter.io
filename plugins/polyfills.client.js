const needsScrollBehaviorPolyfill = 'scrollBehavior' in window.document.documentElement.style

export default async function () {
  if (!needsScrollBehaviorPolyfill) {
    return
  }
  const smoothScroll = await import('smoothscroll-polyfill')
  smoothScroll.polyfill()
}
