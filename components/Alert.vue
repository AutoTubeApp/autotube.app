<template>
  <v-row v-if="alert.visible" class="d-flex justify-center">
    <v-alert
      class="alert"
      border="top"
      colored-border
      type="error"
      elevation="12"
      prominent
    >
      <v-row align="center">
        <v-col
          class="text-center d-flex"
        >
          <span class="pt-1 pl-2 pr-3">{{ alert.msg }}</span>
          <v-spacer />
          <v-btn
            @click="close"
          >
            Close
          </v-btn>
        </v-col>
      </v-row>
    </v-alert>
  </v-row>
</template>

<script>

export default {
  name: 'Alert',
  computed: {
    alert () {
      return this.$store.state.alert
    }
  },
  methods: {
    close () {
      this.$store.commit('alertHide')
    }
  }
}
</script>

<style scoped>
  .alert {
    position: fixed;
    top: 20px;
    z-index: 600;

  }
</style>
