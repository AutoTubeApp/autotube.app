<template>
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
    <v-row v-if="!$fetchState.pending" class="d-flex mt-5">
      <v-col
        v-for="card in cards"
        :key="card.title"
        cols="12"
        sm="4"
      >
        <v-card
          :class="[card.selected ? 'cardSelected' : 'card']"
          outlined
        >
          <v-row class="d-flex ma-1">
            <v-col
              cols="12"
              xs="12"
              sm="4"
              class="d-flex justify-center align-center pa-0"
            >
              <v-img
                :src="card.src"
                max-height="100px"
                max-width="100px"
              />
            </v-col>
            <v-col
              cols="12"
              xs="12"
              sm="8"
              class="d-flex justify-center align-center pa-0"
            >
              <p class="mb-2">
                {{ card.filename }}
              </p>
            </v-col>
          </v-row>
          <v-card-actions
            class="pt-0"
          >
            <v-spacer />
            <v-btn
              color="primary"
              :href="card.link"
            >
              Download
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-row>
</template>

<script>
const yaml = require('js-yaml')

const repoBaseURL = 'https://dppst.s3-website.fr-par.scw.cloud/autotube/'

export default {
  name: 'Download',
  data () {
    return {
      cards: {
        mac: {
          src: '/img/apple.svg',
          filename: 'autotube-0.0.3.dmg',
          link: '',
          selected: true
        },
        windows: {
          src: '/img/windows.svg',
          filename: 'autotube Setup 0.0.48.exe',
          link: '',
          selected: false
        },
        linux: {
          src: '/img/linux.svg',
          filename: 'autotube-0.0.40.AppImage',
          link: '',
          selected: false
        }
      }
    }
  },

  async fetch () {
    await Promise.all([
      this.getLatest('linux'),
      this.getLatest('mac'),
      this.getLatest('windows')]
    )
  },

  methods: {
    async getLatest (os) {
      let filename
      if (os === 'windows') { filename = 'latest.yml' } else { filename = `latest-${os}.yml` }
      const latest = await this.$axios.$get(`${repoBaseURL}${filename}`)
      const parsed = yaml.load(latest)
      this.cards[os].filename = parsed.path
      this.cards[os].link = `${repoBaseURL}${parsed.path}`
    }
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
