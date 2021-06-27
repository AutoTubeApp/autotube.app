<template>
  <div>
    <v-row justify="center" align="center" class="mt-2">
      <v-col cols="12" sm="12">
        <div class="text-center">
          <h1>Yours videos, yours choices !</h1>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <Download />
    </v-row>
    <v-row justify="center" class="mt-15 d-flex">
      <v-alert
        border="left"
        colored-border
        type="warning"
        elevation="2"
      >
        Work in progress: this site is currently under construction use it at your own risk
      </v-alert>
    </v-row>
  </div>
</template>

<script>
import Download from '@/components/Download'

export default {
  components: {
    Download
  }
}
</script>

<style scoped>

</style>
