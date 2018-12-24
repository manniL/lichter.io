module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    '@nuxtjs'
  ],
  rules: {
    'vue/multiline-html-element-content-newline': ['error', {
      'ignoreWhenEmpty': true,
      'ignores': ['pre', 'textarea', 'a']
    }],
    'vue/singleline-html-element-content-newline': ['error', {
      'ignoreWhenNoAttributes': true,
      'ignoreWhenEmpty': true,
      'ignores': ['pre', 'textarea', 'a']
    }]
  }
}
