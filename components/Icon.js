const createTitleElement = (h, title) => title ? [h('title', {}, [title])] : []

export default {
  functional: true,
  props: {
    path: {
      type: String,
      required: true
    },
    viewBox: {
      type: String,
      default: '0 -100 1792 1792'
    },
    iconTitle: {
      type: String,
      default: ''
    }
  },
  render (h, { data, props: { viewBox, path, iconTitle } }) {
    return h('svg', {
      class: 'w-8 h-8 fill-current inline-block',
      ...data,
      attrs: {
        viewBox,
        xmlns: 'http://www.w3.org/2000/svg'
      }
    }, [h('path', { attrs: { d: path } }), ...createTitleElement(h, iconTitle)])
  }
}
