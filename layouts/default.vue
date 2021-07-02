<template>
  <v-app>
    <v-app-bar
      app
    >
      <nuxtLink to="/" exact class="d-flex">
        <v-icon
          class="mr-2"
          large
          color="#1E88E5"
        >
          mdi-youtube
        </v-icon>
      </nuxtLink>
      <v-toolbar-title class="mr-10 text--white" v-text="title" />

      <nuxtLink to="/" exact class="mr-3">
        <span>Home</span>
      </nuxtLink>

      <nuxtLink class="mr-3" to="/docs/introduction" :class="{'nuxt-link-active': $route.name.includes('docs')}">
        <span>Documentation</span>
      </nuxtLink>

      <a
        href="https://github.com/toorop/autotube.support/issues/new/choose"
        target="_blank"
      >
        <span>Support</span>
      </a>

      <v-spacer />
      <v-btn
        v-tooltip="'Use this github repo for bug report and feature request'"
        icon
        color="primary"
        href="https://github.com/toorop/autotube.support/issues/new/choose"
        target="_blank"
      >
        <v-icon>mdi-github</v-icon>
      </v-btn>
      <v-btn
        v-tooltip="'My twitter account'"
        icon
        color="primary"
        href="https://twitter.com/poroot"
        target="_blank"
      >
        <v-icon>mdi-twitter</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-container>
        <Alert />
        <nuxt keep-alive />
      </v-container>
    </v-main>

    <v-footer
      absolute
      app
    >
      <v-col cols="12" class="text-center">
        <span> &copy; {{ new Date().getFullYear() }} <a href="https://dpp.st">dpp.st</a> </span>
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
  }
}
</script>

<style>
a {
  color: darkgray!important;
  text-decoration: none;
}

a.nuxt-link-active {
  color: white!important;
}

</style>
