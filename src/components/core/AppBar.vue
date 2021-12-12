<template>
  <v-app-bar
    app
    flat
  >
    <v-app-bar-nav-icon
      class="hidden-md-and-up"
      @click="toggleDrawer"
    />

    <v-container class="mx-auto py-0">
      <v-row align="center">
        <v-img
          :src="require('@/assets/logo.png')"
          class="mr-5"
          contain
          height="48"
          width="48"
          max-width="48"
          @click="$vuetify.goTo(0)"
        />

        <v-btn
          v-for="(link, i) in links"
          :key="i"
          v-bind="link"
          class="hidden-sm-and-down"
          text
          @click="onClick($event, link)"
        >
          {{ link.text }}
        </v-btn>
        <v-spacer />
        <v-dialog
          v-if="!loggedIn"
          transition="dialog-top-transition"
          max-width="600"
        >
          <template
            v-slot:activator="{ on, attrs }"
          >
            <v-btn
              color="primary"
              v-bind="attrs"
              v-on="on"
            >
              Login
            </v-btn>
          </template>
          <template v-slot:default="dialog">
            <v-card>
              <v-toolbar
                color="primary"
                dark
              >
                Logga in
              </v-toolbar>
              <v-card-text style="padding-bottom: 0">
                <v-form @submit="login">
                  <v-text-field
                    v-model="email"
                    label="Email adress"
                    required
                  />
                  <v-text-field
                    v-model="password"
                    :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="show1 ? 'text' : 'password'"
                    label="Lösenord"
                    required
                    @click:append="show1 = !show1"
                  />
                  <v-btn
                    text
                    @click="reset_password"
                  >
                    Glömt lösenordet: {{ email }}
                  </v-btn>
                  <v-btn
                    text
                    color="error"
                    @click="dialog.value = false"
                  >
                    Cancel
                  </v-btn>
                  <v-btn
                    text
                    color="primary"
                    type="submit"
                    @click="dialog.value = false"
                  >
                    Logga in
                  </v-btn>
                </v-form>
              </v-card-text>
            </v-card>
          </template>
        </v-dialog>
        <v-spacer />

        <v-text-field
          append-icon="mdi-magnify"
          flat
          hide-details
          solo-inverted
          style="max-width: 300px;"
        />
      </v-row>
    </v-container>
  </v-app-bar>
</template>

<script>
  // Utilities
  import {
    mapGetters,
    mapMutations,
    mapActions,
  } from 'vuex'
  import { getAuth, sendPasswordResetEmail } from 'firebase/auth'
  export default {
    name: 'CoreAppBar',

    data: () => ({
      dialog: false,
      show1: false,
      email: '',
      password: '',
    }),

    computed: {
      ...mapGetters(['links', 'loggedIn']),
    },

    methods: {
      ...mapMutations(['toggleDrawer']),
      ...mapActions(['firebaseLogin']),
      onClick (e, item) {
        e.stopPropagation()

        if (item.to || !item.href) return

        this.$vuetify.goTo(item.href.endsWith('!') ? 0 : item.href)
      },
      login (e) {
        e.preventDefault()
        this.firebaseLogin({ email: this.email, password: this.password })
      },
      reset_password (e) {
        this.dialog = false
        const auth = getAuth()
        sendPasswordResetEmail(auth, this.email)
          .then(() => {
            console.log('Sent password rset popup')
          })
          .catch((error) => {
            console.log(error.code)
            console.log(error.message)
            // ..
          })
      },
    },
  }
</script>
