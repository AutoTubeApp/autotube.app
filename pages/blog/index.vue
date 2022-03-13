<template>
  <span />
</template>

<script>
export default {
  name: 'Index',
  beforeCreate () {
    this.$router.push('/blog/index')
  }
}
</script>
