<template>
  <v-container class="pt-1">
    <SocialHead :title="title" :description="description" />
    <v-row justify="center" align="center" class="mt-0 mb-0">
      <v-col cols="12">
        <div class="text-center">
          <h1>AutoTube is a decentralized YouTube alternative </h1>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <Download v-if="!$vuetify.breakpoint.xs" />
    </v-row>
    <v-row>
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
      </v-col>
    </v-row>
    <!-- demo -->
    <v-row class="mt-7 text-center">
      <v-responsive
        class="text-center"
        :aspect-ratio="16/9"
      >
        <iframe
          id="attPlayer"
          width="90%"
          height="90%"
          src="https://v.autotube.app/autotube-demo/embed.html"
          title="AutoTube demo"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        />
      </v-responsive>
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
  }
}
</script>

<style scoped>

</style>
