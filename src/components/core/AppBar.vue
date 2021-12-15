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
        <v-btn
          v-if="loggedIn"
          @click="logout"
        >
          Logout
        </v-btn>
        <v-dialog
          v-if="!loggedIn"
          v-model="dialog"
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
              Logga in
            </v-btn>
          </template>
          <template>
            <v-card>
              <v-toolbar
                color="primary"
                dark
              >
                Logga in
              </v-toolbar>
              <v-card-text style="padding-bottom: 0">
                <p v-if="displayReset">
                  Skickar återställnings mail till {{ email }}
                </p>
                <v-form
                  v-model="valid"
                  @submit="login"
                >
                  <v-text-field
                    v-model="userName"
                    label="Användarnamn"
                    :rules="emailRules"
                    required
                  />
                  <v-text-field
                    v-model="password"
                    :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="show1 ? 'text' : 'password'"
                    label="Lösenord"
                    @click:append="show1 = !show1"
                  />
                  <v-btn
                    text
                    disabled
                    @click="reset_password"
                  >
                    Återställ
                  </v-btn>
                  <v-btn
                    text
                    color="error"
                    @click="dialog = false"
                  >
                    Cancel
                  </v-btn>
                  <v-btn
                    text
                    color="primary"
                    type="submit"
                    :disabled="!valid"
                  >
                    Logga in
                  </v-btn>
                </v-form>
              </v-card-text>
            </v-card>
          </template>
        </v-dialog>
        <v-spacer />
        <!--
        <v-text-field
          append-icon="mdi-magnify"
          flat
          hide-details
          solo-inverted
          style="max-width: 300px;"
        />-->
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
  import { getAuth, sendPasswordResetEmail, signOut } from 'firebase/auth'
  export default {
    name: 'CoreAppBar',

    data: () => ({
      valid: true,
      dialog: false,
      statusDialog: '',
      show1: false,
      userName: '',
      password: '',
      displayReset: false,
      emailRules: [
        v => !!v || 'E-mail is required',
      ],
    }),

    computed: {
      ...mapGetters(['links', 'loggedIn', 'user']),
      email () {
        if (this.userName.includes('@')) {
          return this.userName
        } else {
          return this.userName.concat('@nm56.se')
        }
      },
    },

    watch: {
      dialog: {
        handler (newValue, oldValue) {
          if (!newValue) {
            this.displayReset = false
          }
        },
      },
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
      logout () {
        const auth = getAuth()
        signOut(auth).then().catch((error) => { console.log(error) })
        this.dialog = false
      },
      reset_password (e) {
        this.displayReset = true

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
