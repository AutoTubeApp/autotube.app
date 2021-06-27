<template>
  <v-app>
    <v-app-bar
      app
    >
      <nuxtLink to="/" exact class="d-flex">
        <v-icon
          class="mr-2"
          large
          color="primary"
        >
          mdi-youtube
        </v-icon>
      </nuxtLink>
      <v-toolbar-title class="mr-10 text--white" v-text="title" />

      <nuxtLink to="/" exact class="mr-3">
        <span>Home</span>
      </nuxtLink>

      <nuxtLink to="/docs/">
        <span>Documentation</span>
      </nuxtLink>

      <v-spacer />
      <v-btn
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
        <nuxt />
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
export default {
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
