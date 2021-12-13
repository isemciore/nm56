<template>
  <section id="feed">
    <picture-feed><slot /></picture-feed>
  </section>
</template>

<script>
  export default {
    name: 'HomeAbout',

    components: {
      PictureFeed: () => import('@/components/PictureFeed'),
    },
  }
</script>
