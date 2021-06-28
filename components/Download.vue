<template>
  <v-container v-if="display">
    <v-row class="d-flex">
      <v-row
        v-if="$fetchState.pending"
        class="d-flex"
      >
        <v-col
          id="loading"
          cols="12"
          sm="12"
          class="d-flex justify-center align-center mt-10"
        >
          <v-progress-circular
            :size="80"
            :width="7"
            color="primary"
            indeterminate
          />
        </v-col>
      </v-row>
      <v-row v-if="!$fetchState.pending" class="d-flex mt-5 justify-center">
        <v-col
          v-for="card in cards"
          :key="card.title"
          cols="12"
          xl="3"
          lg="3"
          md="4"
          sm="12"
          xs="12"
        >
          <v-card
            :class="[card.selected ? 'cardSelected' : 'card']"
            outlined
          >
            <v-row class="d-flex ma-1">
              <v-col
                cols="4"
                lg="3"
                md="4"
                sm="2"
                xs="4"

                class="d-flex pa-0"
              >
                <v-img
                  :src="card.src"
                  max-height="100px"
                  max-width="100px"
                />
              </v-col>

              <v-col
                cols="8"
                lg="9"
                md="8"
                sm="10"
                xs="8"
                class="d-flex flex-row justify-end align-center pa-0 pt-2 pt-xl-0"
              >
                <!--
                <span
                  class="text-left text-xl-center pt-xl-0"
                >
                  {{ card.filename }}</span>
                  -->
                <!--<v-spacer /> -->
                <span class="d-flex justify-end ">
                  <v-btn
                    class="white--text mb-3 mr-2 mt-xl-3 mr-xl-4 text-right"
                    color="primary"
                    :href="card.link"
                  >
                    Download
                  </v-btn>
                </span>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </v-row>
  </v-container>
</template>

<script>
import { getOs } from '@/lib/getOs'

// const server = process.env.NODE_ENV !== 'production' ? 'http://localhost:3000' : 'https://autotube.app'
// const server = 'http://localhost:3000'
const server = ''
const repoBaseURL = 'https://dppst.s3-website.fr-par.scw.cloud/autotube/'
const oss = ['linux', 'mac', 'windows']

export default {

  name: 'Download',
  data () {
    return {
      display: false,
      cards: {
        mac: {
          src: '/img/apple.svg',
          filename: 'autotube.dmg',
          link: '',
          selected: true
        },
        windows: {
          src: '/img/windows.svg',
          filename: 'autotube-setup.exe',
          link: '',
          selected: false
        },
        linux: {
          src: '/img/linux.svg',
          filename: 'autotube.AppImage',
          link: '',
          selected: false
        }
      }
    }
  },

  async fetch () {
    let latest
    try {
      latest = await this.$axios.$get(`${server}/api/latest-packages`)
    } catch (e) {
      return
    }
    this.display = true
    oss.forEach((os) => {
      this.cards[os].link = `${repoBaseURL}${latest[os]}`
    })
  },

  /* watch: {
    '$route.query': '$fetch'
  }, */

  mounted () {
    const userOs = getOs()
    oss.forEach((os) => {
      this.cards[os].selected = os === userOs
    })
  }
}
</script>

<style scoped>
.card {
  opacity: 0.65;
}

.cardSelected {
  opacity: 1;
}

</style>
