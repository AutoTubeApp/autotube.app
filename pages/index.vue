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
      snackbar: true
    }
  }
}
</script>

<style scoped>

</style>
