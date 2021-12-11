<template>
  <div id="home">
    <articles>
      <!--<banner />-->
    </articles>
    <!--
      <about />

      <subscribe />
      <social />
      -->
  </div>
</template>

<script>
  export default {
    name: 'Pictures',

    components: {
      Articles: () => import('@/components/pictures/Articles'),
      Banner: () => import('@/components/pictures/Banner'),
      Social: () => import('@/components/pictures/Social'),
      Subscribe: () => import('@/components/pictures/Subscribe'),
    },
  }
</script>
