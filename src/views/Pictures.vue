<template>
  <div id="home">
    <articles>
    </articles>
  </div>
</template>

<script>
  export default {
    name: 'Pictures',

    components: {
      Articles: () => import('@/components/pictures/Articles'),
    },
  }
</script>
