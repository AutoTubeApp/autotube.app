<template>
  <v-row class="pa-5 pb-2 mt-2 mb-2" align="center" justify="center">
    <v-responsive :aspect-ratio="ratio">
      <iframe
        width="100%"
        height="100%"
        :src="src"
        title="Spring"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      />
    </v-responsive>
  </v-row>
</template>

<script>
export default {
  name: 'AutotubePlayer',
  props: {
    ratio: {
      type: Number,
      default: 16 / 9
    },
    src: {
      type: String,
      required: true
    }
  }
}
</script>
