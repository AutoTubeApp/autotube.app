<template>
  <v-app>
    <v-app-bar
      app
    >
      <nuxtLink to="/" exact class="d-flex no-decoration">
        <v-icon
          class="mr-2"
          large
          color="#2894f4"
        >
          mdi-youtube
        </v-icon>
      </nuxtLink>
      <v-toolbar-title class="mr-10 text--white" v-text="title" />

      <nuxtLink to="/" exact class="mr-3 no-decoration" :class="{'dark': $vuetify.theme.dark}">
        <span>Home</span>
      </nuxtLink>

      <nuxtLink class="mr-3 no-decoration" :class="{'nuxt-link-active': $route.name.includes('docs'), 'dark': $vuetify.theme.dark}" to="/docs/introduction">
        <span>Documentation</span>
      </nuxtLink>

      <nuxtLink class="mr-3 no-decoration" :class="{'nuxt-link-active': $route.name.includes('blog'), 'dark': $vuetify.theme.dark}" to="/blog/">
        <span>Blog</span>
      </nuxtLink>

      <a
        class="no-decoration"
        :class="{'dark': $vuetify.theme.dark}"
        href="https://github.com/AutoTubeApp/autotube.support/issues/new/choose"
        target="_blank"
      >
        <span>Support</span>
      </a>

      <v-spacer />
      <v-btn
        v-tooltip="'Github'"
        class="mr-1 pr-0"
        icon
        color="primary"
        href="https://github.com/AutoTubeApp"
        target="_blank"
      >
        <v-icon>mdi-github</v-icon>
      </v-btn>
      <v-btn
        v-tooltip="'Follow us on twitter'"
        icon
        color="primary"
        href="https://twitter.com/autotubeVideo"
        target="_blank"
      >
        <v-icon>mdi-twitter</v-icon>
      </v-btn>
      <v-btn
        v-if="!$vuetify.theme.dark"
        v-tooltip="'Enable Dark mode'"
        icon
        color="yellow darken-3"
        @click="darkMode"
      >
        <v-icon>mdi-moon-waxing-crescent</v-icon>
      </v-btn>
      <v-btn
        v-if="$vuetify.theme.dark"
        v-tooltip="'Disable Dark mode'"
        icon
        color="yellow darken-2"
        @click="darkMode"
      >
        <v-icon>mdi-white-balance-sunny</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-container id="main">
        <Alert />
        <nuxt />
      </v-container>
    </v-main>

    <v-footer
      absolute
      app
    >
      <v-col cols="12" class="text-center">
        <span class="body-2"> &copy; {{ new Date().getFullYear() }} <a href="https://dpp.st">dpp.st</a> </span>
      </v-col>
    </v-footer>
  </v-app>
</template>

<script>
import Alert from '@/components/Alert'

export default {
  components: { Alert },
  data () {
    return {
      title: 'AutoTube'
    }
  },
  methods: {
    darkMode () {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark
    }
  }
}
</script>

<style scoped>

a.dark {
  color: white;
}

#main {
  max-width: 1200px!important;
}

</style>
