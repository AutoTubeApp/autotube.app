<template>
  <v-row v-if="display" class="privacy-consent d-flex flex-row-reverse">
    <v-col
      cols="11"
      sm="8"
      md="6"
      lg="4"
      xl="3"
      class="mr-5 mb-9"
    >
      <v-card
        outlined
        rounded="lg"
      >
        <v-card-title class="text-h5">
          Privacy Policy
        </v-card-title>

        <v-card-text class="mt-3">
          We'd like to set Google Analytics cookies to help us improve our website by collecting and reporting
          information on how you use it. The cookies collect information in a way that does not directly identify
          anyone. For more information on how these cookies work please see our <nuxt-link to="/cookie">
            Cookies page
          </nuxt-link>.
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            @click="reject()"
          >
            reject
          </v-btn>
          <v-btn
            color="primary"
            @click="accept()"
          >
            accept
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
import { bootstrap } from 'vue-gtag'

export default {
  name: 'PrivacyConsent',
  data () {
    return {
      display: false,
      consent: false
    }
  },
  mounted () {
    this.consent = localStorage.getItem('consent')
    if (this.consent === 'true') {
      bootstrap()
    } else if (this.consent === null) {
      this.display = true
    }
  },
  methods: {
    accept () {
      bootstrap().then(() => {
        localStorage.setItem('consent', 'true')
        this.display = false
      })
    },
    reject () {
      localStorage.setItem('consent', 'false')
      this.display = false
    }
  }
}
</script>

<style scoped>
.privacy-consent {
  z-index: 188;
  position: fixed;
  bottom: 0;
  width: 100%;
}
</style>
