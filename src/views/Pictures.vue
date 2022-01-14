<template>
  <div id="home">
    <picture-feed v-if="!thumbnailImage">
      <slot />
    </picture-feed>
    <picture-feed
      v-else
      :layout="Array(12*6).fill(12)"
    >
      <slot />
    </picture-feed>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'Pictures',
    components: {
      PictureFeed: () => import('@/components/PictureFeed'),
    },
    computed: {
      ...mapGetters(['thumbnailImage']),
    },
  }
</script>
