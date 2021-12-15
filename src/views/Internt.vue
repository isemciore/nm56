<template>
  <div id="Info">
    <v-container>
      <v-row>
      <v-col cols="4" style="min-width: 500px">
        <news-column collection-name="internal"></news-column>
      </v-col>
      <v-col cols="auto">
        <v-row>
          <category-table
            storage-path="internt/stadgar_och_regler"
            title="titel"
            description="beskrivning"
            :listener="poke"
          />
        </v-row>
        <v-row>
          <category-table
            storage-path="internt/styrelsen"
            title="titel"
            description="Saker som bara styrelsen ser"
            :listener="poke"
          />
        </v-row>
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
    name: 'Internt',
    components: { NewsColumn, CategoryTable },
    data: function () {
      return {
        newMemberLink: [],
        poke: 1,
      }
    },
    state: {
      pageToken: null,
    },

    computed: {
      ...mapGetters(['user']),
    },
    methods: {
      updateSubList () {
        this.poke = this.poke + 1
      },
    },
  }

</script>

<style scoped>

</style>
