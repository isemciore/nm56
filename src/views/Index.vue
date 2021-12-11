<template>
  <div id="Index">
    <index-banner></index-banner>

    <about></about>
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
