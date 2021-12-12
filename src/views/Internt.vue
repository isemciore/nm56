<template>
  <div id="Info">
    <v-container>
      <v-row>
        <v-btn @click="get_item_list()">
          Uppdatera
        </v-btn>
      </v-row>
      <v-row>
        <v-card>
          <v-card-subtitle>
            Stadgar och regler:
          </v-card-subtitle>
          <v-simple-table dense>
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left">
                    Filnamn
                  </th>
                  <th class="text-left">
                    Meta
                  </th>
                  <th class="text-right">
                    Nerladdnings länk
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="item in newMemberLink"
                  :key="item.md5Hash"
                >
                  <td>{{ item.name }}</td>
                  <td>---</td>
                  <td> <a :href="item.downloadLink">Ladda ner</a></td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
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
    data: function () {
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
        const listRef = ref(storage, 'ny_medlem')

        this.newMemberLink.splice(0, this.newMemberLink)
        this.populate_file_list(listRef, this.newMemberLink)
      },
      populate_file_list (listRef, fileList) {
        listAll(listRef)
          .then((res) => {
            res.prefixes.forEach((folderRef) => {
              this.populate_file_list(folderRef, fileList)
              // All the prefixes under listRef.
              // You may call listAll() recursively on them.
            })
            res.items.forEach((itemRef) => {
              getMetadata(itemRef).then((metaData) => {
                getDownloadURL(itemRef).then((dl) => {
                  // Check if there is n't match
                  fileList.push({ downloadLink: dl, ...metaData })
                })
              })
              // All the items under listRef.
            })
          }).catch((error) => {
            console.log(error)
          // Uh-oh, an error occurred!
          })
      },
    },
  }

</script>

<style scoped>

</style>
