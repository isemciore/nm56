<template>
  <div id="Info">
    <v-container>

      <v-row>
        <v-btn @click="get_item_list('ny_medlem')">
          Hämta saker
        </v-btn>

        <v-card>
          <v-list-item
            v-for="item in newMemberLink"
            :key="item.md5Hash"
            two-line
          >
            <v-list-item-content>
              <v-list-item-title>{{ item.name }}</v-list-item-title>
              <v-list-item-subtitle>
                <a :href="item.downloadLink">Ladda ner</a>
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-card>
      </v-row>
    </v-container>
  </div>
</template>

<script>
  import { getStorage, ref, listAll, getDownloadURL, getMetadata } from 'firebase/storage'
  import { mapGetters } from 'vuex'

  export default {
    name: 'Internt',
    data: function() {
      return {
        newMemberLink: [],
      }
    },
    state: {
      pageToken: null,
    },

    computed: {
      ...mapGetters(['user']),
    },
    methods: {
      get_item_list (path) {
        const storage = getStorage()
        const listRef = ref(storage, path)
        listAll(listRef)
          .then((res) => {
            res.prefixes.forEach((folderRef) => {
              // All the prefixes under listRef.
              // You may call listAll() recursively on them.
            })
            res.items.forEach((itemRef) => {
              getMetadata(itemRef).then((metaData) => {
                getDownloadURL(itemRef).then((dl) => {
                  // Check if there is n't match
                  this.newMemberLink.push({ downloadLink: dl, ...metaData })
                })
              })
              // All the items under listRef.
            })
          }).catch((error) => {
          // Uh-oh, an error occurred!
          })
      },
    },
  }

</script>

<style scoped>

</style>
