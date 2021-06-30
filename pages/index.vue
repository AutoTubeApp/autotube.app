<template>
  <div>
    <v-row justify="center" align="center" class="mt-2">
      <v-col cols="12">
        <div class="text-center">
          <h1>Yours videos, yours choices !</h1>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <Download />
    </v-row>
    <v-row justify="center" class="mt-5 d-flex">
      <v-alert
        class="mt-10 pt-6"
        border="top"
        colored-border
        type="warning"
        elevation="8"
      >
        <span>🚧 🚧 Work in progress: this site is currently under construction use, it at your own risk! 🚧 🚧</span>
      </v-alert>
    </v-row>
    <v-row v-resize="onResize" justify="center" class="mt-11 d-flex">
      <v-col
        cols="12"
        class="text-center"
      >
        <iframe
          :width="iframeWidth +'px'"
          :height="iframeWidth * (9/16) + 'px'"
          src="https://v.autotube.app/autotube/embed.html"
          title="autotube demo"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        />
        <p>AutoTube demo  </p>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import Download from '@/components/Download'

export default {
  components: {
    Download
  },
  data () {
    return {
      iframeWidth: 800
    }
  },
  mounted () {
    this.onResize()
  },
  methods: {
    onResize () {
      this.iframeWidth = 0.6 * window.innerWidth
      if (this.iframeWidth > 1200) { this.iframeWidth = 1200 }
    }
  }
}
</script>

<style scoped>

</style>
