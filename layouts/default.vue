<template>
  <v-app>
    <v-app-bar
      app
    >
      <nuxtLink v-if="!$vuetify.breakpoint.xs" to="/" exact class="no-decoration">
        <v-icon
          class="pr-lg-3 pr-sm-1"
          large
          color="#2894f4"
        >
          mdi-youtube
        </v-icon>
      </nuxtLink>
      <v-app-bar-nav-icon v-if="$vuetify.breakpoint.xs" @click="drawer = true" />
      <nav v-if="!$vuetify.breakpoint.xs" class="d-flex align-center">
        <v-toolbar-title class="mr-8 text--white" v-text="title" />
        <nuxtLink to="/" exact class="mr-3 no-decoration">
          <span>Home</span>
        </nuxtLink>
        <nuxtLink
          class="mr-3 no-decoration"
          :class="{'nuxt-link-active': $route.name.includes('docs')}"
          to="/docs/introduction"
        >
          <span>Documentation</span>
        </nuxtLink>
        <nuxtLink
          class="mr-3 no-decoration"
          :class="{'nuxt-link-active': $route.name.includes('blog')}"
          to="/blog"
        >
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
      </nav>

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
        href="https://twitter.com/AutoTubeVideo"
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

    <v-navigation-drawer
      v-model="drawer"
      absolute
      temporary
    >
      <v-list
        nav
        dense
      >
        <v-list-item-group>
          <!-- home -->
          <nuxtLink to="/" exact class="no-decoration">
            <v-list-item>
              <v-list-item-icon>
                <v-icon>mdi-home</v-icon>
              </v-list-item-icon>
              <v-list-item-title>
                <span>Home</span>
              </v-list-item-title>
            </v-list-item>
          </nuxtLink>
          <!-- docs -->
          <nuxtLink
            class="no-decoration"
            to="/docs/introduction"
          >
            <v-list-item>
              <v-list-item-icon>
                <v-icon>mdi-book-open-page-variant</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Documentation</v-list-item-title>
            </v-list-item>
          </nuxtLink>
          <!-- blog -->
          <nuxtLink
            class="no-decoration"
            to="/blog"
          >
            <v-list-item>
              <v-list-item-icon>
                <v-icon>mdi-post-outline</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Blog</v-list-item-title>
            </v-list-item>
          </nuxtLink>
          <!-- support -->
          <a
            class="no-decoration"
            href="https://github.com/AutoTubeApp/autotube.support/issues/new/choose"
            target="_blank"
          >
            <v-list-item>
              <v-list-item-icon>
                <v-icon>mdi-lifebuoy</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Support</v-list-item-title>
            </v-list-item>
          </a>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
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
      title: 'AutoTube',
      drawer: false
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

.theme--dark .v-navigation-drawer {
  background-color: #05131f;
}

.theme--dark a {
  color: white;
}

#main {
  max-width: 1200px !important;
}

</style>
