<template>
  <v-container>
    <v-btn v-if="user && user.email === 'styrelsen@nm56.se'" x-small @click="dialog=true">Nytt inlägg</v-btn>
    <v-dialog v-model="dialog" max-width="800px">
      <v-card>
        <v-container>
        <v-form>
          <v-text-field v-model="newPost.title" label="Titel"></v-text-field>
          <v-textarea v-model="newPost.description" label="Material"></v-textarea>
          <v-btn @click="addNewsPost">Posta</v-btn>
          <v-btn @click="dialog=false">Avbryt</v-btn>
        </v-form>
        </v-container>
      </v-card>
    </v-dialog>
    <v-card v-for="post in this.posts" :key="post.date.seconds" class="ma-5"
    style="border: 2px solid dodgerblue">
      <v-card-title>{{post.title}}</v-card-title>
      <v-card-subtitle> {{cleanDateString(post.date)}}</v-card-subtitle>
      <v-card-text>{{post.description}}</v-card-text>
    </v-card>
  </v-container>
</template>

<script>
  import { getFirestore, serverTimestamp, query, orderBy, addDoc, collection, getDocs } from 'firebase/firestore'
  import { mapGetters } from 'vuex'
  export default {
    name: 'NewsColumn',

    props: {
      collectionName: String,
    },
    computed: {
      ...mapGetters(['user']),
    },

    mounted() {
      this.getNewsPost()
    },

    data: function () {
      return {
        dialog: false,
        posts: [],
        newPost: { title: '', description: '', date: 0 },
      }
    },

    methods: {
      cleanDateString(dateObj){
        return dateObj.toDate().toString().substring(0, 21)
      },
      async getNewsPost () {
        this.posts.slice(0, this.posts.length)
        const db = getFirestore()
        const docRefs = collection(db, this.collectionName)
        const q = query(docRefs, orderBy("date", "desc"))
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          this.posts.push(doc.data())
        })
      },
      async addNewsPost () {
        const db = getFirestore()
        const newPost = this.newPost
        try {
          newPost.date = serverTimestamp()
          const docRef = await addDoc(collection(db, this.collectionName), newPost)
          console.log("uploaded", docRef.id)
        } catch(e){
          console.log(e)
          console.log('Failed add doc')
        }
        this.dialog=false
      },
    },
  }
</script>

<style scoped>

</style>
