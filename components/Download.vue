<template>
  <v-container>
    <v-row class="d-flex">
      <v-row class="d-flex mt-1 justify-center">
        <v-col
          v-for="card in cards"
          :key="card.title"
          cols="12"
          xl="4"
          lg="4"
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
                <span class="d-flex justify-end ">
                  <v-btn
                    :disabled="card.link === ''"
                    class="white--text mb-3 mr-2 mt-xl-3 mr-xl-4 text-right"
                    color="primary"
                    :href="card.link"
                  >
                    Download <span v-if="$vuetify.breakpoint.name !== 'md'"> {{ card.btnText }} </span></v-btn>
                </span>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </v-row>
    <v-row class="d-flex">
      <v-col
        v-if="version!== ''"
        cols="12"
        class="text-center mt-3"
      >
        Latest Version: {{ version }}
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { getOs } from '@/lib/getOs'
import { mapActions } from 'vuex'

const repoBaseURL = 'https://dppst.s3-website.fr-par.scw.cloud/autotube/'
const wkGetVersion = 'https://autotube-get-version.dppst.workers.dev/'
const oss = ['linux', 'mac', 'windows']

export default {

  name: 'Download',
  data () {
    return {
      version: '',
      cards: {
        mac: {
          src: '/img/apple.svg',
          filename: 'autotube.dmg',
          link: '',
          btnText: 'for Mac',
          selected: true
        },
        windows: {
          src: '/img/windows.svg',
          filename: 'autotube-setup.exe',
          link: '',
          btnText: 'for Windows',
          selected: false
        },
        linux: {
          src: '/img/linux.svg',
          filename: 'autotube.AppImage',
          link: '',
          btnText: 'for Linux',
          selected: false
        }
      }
    }
  },

  mounted () {
    // get last version
    this.getVersion()
    const userOs = getOs()
    oss.forEach((os) => {
      this.cards[os].selected = os === userOs
    })
  },

  methods: {
    ...mapActions(['alertShow']),
    async  getVersion () {
      await this.$axios.get(wkGetVersion)
        .then((r) => {
          this.version = r.data.version
          this.cards.mac.link = `${repoBaseURL}autotube-${this.version}.dmg`
          this.cards.windows.link = `${repoBaseURL}autotube Setup ${this.version}.exe`
          this.cards.linux.link = `${repoBaseURL}autotube-${this.version}.AppImage`
        })
        .catch((e) => {
          this.alertShow({ msg: e, type: 'error' })
        })
    }
  }

}
</script>

<style scoped>
.card {
  opacity: 0.40;
}

.cardSelected {
  opacity: 1;
}

</style>
