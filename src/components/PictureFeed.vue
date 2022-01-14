<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <slot />
      </v-col>

      <picture-feed-card
        v-for="(article, i) in paginatedArticles"
        :key="article.title"
        :size="layout[i]"
        :value="article"
      />
    </v-row>

    <v-row align="center">
      <v-col cols="3">
        <base-btn
          v-if="page !== 1"
          class="ml-0"
          square
          title="Previous page"
          @click="page--"
        >
          <v-icon>mdi-chevron-left</v-icon>
        </base-btn>
      </v-col>

      <v-col
        class="text-center subheading"
        cols="6"
      >
        PAGE {{ page }} OF {{ pages }}
      </v-col>

      <v-col
        class="text-right"
        cols="3"
      >
        <base-btn
          v-if="pages > 1 && page < pages"
          class="mr-0"
          square
          title="Next page"
          @click="page++"
        >
          <v-icon>mdi-chevron-right</v-icon>
        </base-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  // Utilities
  import {
    mapState,
  } from 'vuex'
  import { getAnalytics, logEvent } from 'firebase/analytics'

  export default {
    name: 'PictureFeed',

    props: {
      layout: {
        type: Array,
        required: false,
        default: [4, 4, 4, 4, 2, 2, 3, 3, 3, 2, 2]
      },
    },

    components: {
      PictureFeedCard: () => import('@/components/PictureFeedCard'),
    },

    data: () => ({
      page: 1,
    }),

    computed: {
      ...mapState(['nm56pictures']),
      pages () {
        return Math.ceil(this.nm56pictures.length / this.layout.length)
      },
      paginatedArticles () {
        const start = (this.page - 1) * this.layout.length
        const stop = this.page * this.layout.length
        const analytics = getAnalytics()
        logEvent(analytics, 'display public image ', { page: this.page })
        return this.nm56pictures.slice(start, stop)
      },
    },

    watch: {
      page () {
        window.scrollTo(0, 0)
      },
    },
  }
</script>
