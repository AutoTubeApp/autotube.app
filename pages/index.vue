<template>
  <v-container class="pt-1 ">
    <SocialHead :title="title" :description="description" />
    <v-row justify="center" align="center" class="mt-0 mb-0">
      <v-col cols="12">
        <div class="text-center">
          <h1>AutoTube is a decentralized YouTube alternative </h1>
        </div>
      </v-col>
    </v-row>
    <!--    <v-row justify="center" class="d-flex">
      <v-col
        cols="12"
        md="8"
      >
        <v-alert
          class="pt-6 text-center justify-center text-sm-h6"
          border="top"
          colored-border
          type="warning"
          elevation="8"
        >
          <span>🍾🍾🍾 AutoTube now integrates full support of IPFS 🍾🍾🍾</span>
        </v-alert>
      </v-col>
    </v-row>-->
    <v-row>
      <Download />
    </v-row>
    <v-row lass="d-flex">
      <v-col
        class=""
        cols="12"
      >
        <p>
          Thanks to AutoTube you will be able to share videos through the web without any constraints, nor adds,
          or annoying platform rules.<br>
          It's yours videos and so it must be your choice to share them with your friends, or with the world.<br>
        </p>
        <ul>
          <li>Upload to: IPFS, Amazon S3 compatible storage, or any web hosting plan through FTP or SFTP,... more to come.</li>
          <li>Virtually unstoppable if you use IPFS. Each player becomes an IPFS node which will host and share your videos via peer to peer.</li>
          <li>Select yourself the quality of your streams.</li>
          <li>Direct upload from YouTube (soon).</li>
          <li>Available for Windows, MacOS, and Linux.</li>
          <li>100% Free and (soon) fully Open Source.</li>
          <li>More and more to come. Stay Tuned !</li>
        </ul>
        <h2 class="mt-4">
          Watch the demo (created with AutoTube):
        </h2>
      </v-col>
    </v-row>
    <!-- demo -->
    <v-row v-resize="onResize" justify="center" class="mt-5 d-flex text-center">
      <v-col
        cols="12"
        md="12"
        class="text-center"
      >
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
    <!--- end demo -->

    <!--- french demo -->
    <v-row lass="d-flex">
      <v-col
        class=""
        cols="12"
      >
        <h2 class="mt-4">
          AutoTube full presentation (in 🧀🍷🥖):
        </h2>
      </v-col>
    </v-row>
    <v-row v-resize="onResize" justify="center" class="mt-5 d-flex text-center">
      <v-col
        cols="12"
        md="12"
        class="text-center"
      >
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
    <!--- end french demo -->
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
      title: 'AutoTube is a decentralized YouTube alternative',
      description: 'Host your videos on ipfs, on any aws s3 compatible storage, or any web hosting plan.',
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
