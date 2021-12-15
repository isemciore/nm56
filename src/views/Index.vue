<template>
  <div id="Index">
    <index-banner></index-banner>

    <about></about>

      <v-container>
        <p>Logga in för att se internt information</p>

      </v-container>
  </div>
</template>

<script>
  import IndexBanner from '../components/index/IndexBanner'
  export default {
    name: 'Index',

    components: {
      IndexBanner,
      About: () => import('@/components/index/About'),
    },
  }
</script>

<style scoped>

</style>
