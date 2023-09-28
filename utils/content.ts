export function onContentNotFound(page: Ref<any>) {
  if (page.value) {
    return
  }

  if (process.server) {
    const event = useRequestEvent()
    setResponseStatus(event, 404)
  }

  throw createError({
    fatal: true,
    statusCode: 404,
  })
}