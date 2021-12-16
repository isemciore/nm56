<template>
  <v-card class="ma-2" flat>
    <v-card-title class="pa-1 text--black"> {{ title }} </v-card-title>
    <v-card-text v-if="description !== ''" class="pa-1"> {{description}} </v-card-text>
    <v-simple-table dense>
      <template v-slot:default>
        <thead><tr>
          <th class="text-left"> Filnamn</th>
          <th class="text-left">Meta</th>
          <th class="text-right">Nerladdnings länk</th>
        </tr></thead>
        <tbody>
        <tr v-for="item in fileLinks" :key="item.md5Hash">
          <td>{{ item.name }}</td>
          <td>---</td>
          <td> <a :href="item.downloadLink">Ladda ner</a></td>
        </tr>
        <tr v-if="fileLinks.length === 0">
          <td>Hittade inga filer i denna kategori</td>
        </tr>
        </tbody>
      </template>
    </v-simple-table>
    <v-card-actions v-if="user && user.email === 'styrelsen@nm56.se'" class="pa-0">
      <v-btn outlined small @click="dialog=true">Ladda upp</v-btn>
      <v-dialog persistent v-model="dialog" max-width="800px">
        <template>
          <v-card class="ma-0 pa-0" style="max-width: 800px;">
            <v-card-title>Ladda upp filer</v-card-title>
              <v-file-input
                v-model="uploadFileNames"
                show-size
                counter
                multiple
                label="File input"
              ></v-file-input>
            <v-card-actions>
              <v-btn @click="dialog=false">Cancel</v-btn>
              <v-btn @click="uploadFiles">Upload</v-btn>
            </v-card-actions>
          </v-card>
        </template>
      </v-dialog>
    </v-card-actions>
  </v-card>
</template>

<script>
  import { getDownloadURL, getMetadata, getStorage, listAll, ref, uploadBytesResumable } from 'firebase/storage'
  import { mapGetters } from 'vuex'

  export default {
    name: 'categoryTable',

    data: function() {
      return {
        fileLinks: this.defaultData,
        uploadFileNames: [],
        dialog: false,
      }
    },
    computed: {
      ...mapGetters(['user']),
    },

    props: {
      title: String,
      storagePath: {
        type: String,
        required: true
      },
      description: {
        type:String,
        default: ''
      },
      listener: Number,
      defaultData: {
        type: Array,
        default() {
          return []
        }
      }
    },
    mounted () {
      this.update_item_list()
    },
    watch: {
      listener (old, newValue) {
        if (old !== newValue){
          this.update_item_list()
        }
      },
    },
    methods: {
      update_item_list(){
        const storage = getStorage()
        const listRef = ref(storage, this.storagePath)

        this.fileLinks.splice(0, this.fileLinks.length)
        this.populate_file_list(listRef)
      },
      populate_file_list (listRef) {
        listAll(listRef)
          .then((res) => {
            res.prefixes.forEach((folderRef) => {
              this.populate_file_list(folderRef)
            })
            res.items.forEach((itemRef) => {
              getMetadata(itemRef).then((metaData) => {
                getDownloadURL(itemRef).then((dl) => {
                  this.fileLinks.push({ downloadLink: dl, ...metaData })
                })
              })
            })
          }).catch((error) => {
          console.log(error)
        })
      },
      async uploadFiles() {
        console.log("Press upload")
        console.log(this.uploadFileNames)
        for (const file of this.uploadFileNames){
          const storageUrl = await this.uploadFile(file)
        }
        console.log("done")
        this.dialog=false
      },
      async uploadFile(file){
        const storage = getStorage()
        const storagePath = this.storagePath
        return new Promise((resolve, reject) => {
          const storageRef = ref(storage, storagePath.concat("/", file.name))
          const uploadTask = uploadBytesResumable(storageRef, file);
          uploadTask.on('state_changed',
            (snapshot) => {
              const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              console.log('Upload is ' + progress + '% done');
              switch (snapshot.state) {
                case 'paused':
                  console.log('Upload is paused');
                  break;
                case 'running':
                  console.log('Upload is running');
                  break;
              }
            },
            (error) => {
              console.log("upload error")
              console.log(error.code)
            },
            () => {
              getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                resolve(downloadURL)
                console.log('File available at', downloadURL);
              });
            }
          )
        })
      }
    },

  }
</script>

<style scoped>

</style>
