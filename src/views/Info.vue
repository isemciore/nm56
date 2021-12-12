<template>
  <div id="Info">
    <v-container>
      Info

      Länk till ekonomi

      <v-row>
        <v-card>
          <v-card-subtitle>
            Användbara länkar för externa
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
                  v-for="item in publicDownloadLinks"
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
  import { mapGetters } from 'vuex'
  export default {
    name: 'Info',

    computed: {
      ...mapGetters(['publicDownloadLinks']),
    },
  }
</script>

<style scoped>

</style>
