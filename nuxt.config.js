import colors from 'vuetify/es5/util/colors'

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s',
    title: '',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Decentralized YouTube Alternative - Autotube' }
    ],
    link: [
      { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/assets/css/main.css',
    '~/assets/css/tooltip.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/vue-tooltip.js'
  ],

  serverMiddleware: [
    { path: '/api', handler: '~/server-middleware/api.js' }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios',
    '@nuxt/content'
  ],
  // routes: [],
  router: {
    extendRoutes (routes, resolve) {
      routes.push({
        name: 'blog-home',
        path: '/blog',
        component: resolve(__dirname, 'pages/blog/_.vue')
      })

      routes.push({
        name: 'blog-tag',
        path: '/blog/tag/:_tag',
        component: resolve(__dirname, 'pages/blog/_.vue')
      })

      routes.push({
        name: 'doc-home',
        path: '/doc',
        component: resolve(__dirname, 'pages/docs/_slug.vue')
      })
    }
  },
  generate: {
    crawler: true,
    async routes () {
      const { $content } = require('@nuxt/content')
      const docFiles = await $content('docs').only(['path']).fetch()
      const blogFiles = await $content('blog').only(['path']).fetch()
      const files = docFiles.concat(blogFiles)
      return files.map(file => file.path === '/index' ? '/' : file.path)
    }
  },
  content: {
  // Options
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    treeShake: true,
    options: { customProperties: true },
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: '#2894f4',
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },
  loading: {
    color: '#05131f',
    height: '3px'
  },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },
  ssr: true,
  target: 'static'
}
