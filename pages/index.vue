<template>
  <v-container>
    <SocialHead :title="title" :description="description" />
    <v-row justify="center" align="center" class="mt-2">
      <v-col cols="12">
        <div class="text-center">
          <h1>Encode, publish and host your videos yourself</h1>
        </div>
      </v-col>
    </v-row>
    <v-row justify="center" class="d-flex">
      <v-col
        cols="12"
        md="8"
      >
        <v-alert
          class="mt-6 pt-6"
          border="top"
          colored-border
          type="warning"
          elevation="8"
        >
          <span>🚧 🚧 The application and the site are currently under development. You can test the app but keep in mind that this is not a final version and there might be some bugs. 🚧 🚧</span>
        </v-alert>
      </v-col>
    </v-row>
    <v-row>
      <Download />
    </v-row>
    <v-row v-resize="onResize" justify="center" class="mt-5 d-flex text-center">
      <v-col
        cols="12"
        md="12"
        class="text-center"
      >
        <h2 class="mb-4">
          AutoTube demo
        </h2>
        <iframe
          :width="iframeWidth +'px'"
          :height="iframeWidth * (9/16) + 'px'"
          src="https://v.autotube.app/autotube-demo/embed.html"
          title="AutoTube demo"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        />
      </v-col>
    </v-row>
    <v-row v-resize="onResize" justify="center" class="mt-11 d-flex text-center">
      <v-col
        cols="12"
        md="12"
        class="text-center"
      >
        <h2 class="mb-4">
          AutoTube full presentation (in 🧀🍷🥖).
        </h2>
        <iframe
          :width="iframeWidth +'px'"
          :height="iframeWidth * (9/16) + 'px'"
          src="https://v.autotube.app/autotube/embed.html"
          title="AutoTube presentation en français"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; picture-in-picture"
          allowfullscreen
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Download from '@/components/Download'

export default {
  components: {
    Download
  },
  data () {
    return {
      title: 'AutoTube - Encode, publish and host your videos yourself.',
      description: 'AutoTube allows you to simply encode, publish and host your videos on the web.',
      iframeWidth: 800
    }
  },
  head () {
    return {
      title: this.title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.description
        }
      ]
    }
  },
  mounted () {
    setTimeout(this.onResize, 500)
  },
  methods: {
    onResize () {
      this.iframeWidth = 0.6 * window.innerWidth
      if (this.iframeWidth > 800) {
        this.iframeWidth = 800
      }
    }
  }
}
</script>

<style scoped>

</style>
