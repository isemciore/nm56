<template>
  <div id="Info">
    <v-container>
      <v-row>
        <v-col cols="4" style="min-width: 500px">
          <news-column collection-name="public"></news-column>
        </v-col>
        <v-col cols="auto">

        <category-table
          storage-path="public/nyttigt"
          title="Publikt"
          description="Användbara länkar för gäster"
          :default-data="publicDownloadLinks"
        />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import CategoryTable from '@/components/internt/categoryTable'
  import NewsColumn from '@/components/internt/newsColumn'
  export default {
    name: 'Info',
    components: { NewsColumn, CategoryTable },
    data: function () {
      return {
        newMemberLink: [],
        poke: 1,
      }
    },
    computed: {
      ...mapGetters(['publicDownloadLinks']),
    },
  }
</script>

<style scoped>

</style>
