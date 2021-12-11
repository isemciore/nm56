<template>
  <section id="feed">
    <!--
    <feed>
      <slot />
    </feed>
    -->
    <picture-feed><slot /></picture-feed>
  </section>
</template>

<script>
  export default {
    name: 'HomeAbout',

    components: {
      PictureFeed: () => import('@/components/PictureFeed'),
      Feed: () => import('@/components/Feed'),
    },
  }
</script>
