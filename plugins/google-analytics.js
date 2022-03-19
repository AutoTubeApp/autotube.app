import Vue from 'vue'
import VueGtag from 'vue-gtag'

Vue.use(VueGtag, {
  bootstrap: false,
  config: {
    id: 'G-36BWG3B6BH',
    customResourceURL: 'https://www.googletagmanager.com/gtag/js'
  },
  appName: 'Autotube.app'
})
