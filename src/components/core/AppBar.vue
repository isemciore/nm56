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
          transition="dialog-top-transition"
          max-width="600"
        >
          <template
            v-if="!loggedIn"
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
                <v-text-field
                  v-model="email"
                  label="Email adress"
                  required
                />
                <v-text-field
                  v-model="password"
                  :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="show1 ? 'text' : 'password'"
                  @click:append="show1 = !show1"
                  label="Lösenord"
                  required
                />
              </v-card-text>
              <v-card-actions class="justify-end">
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
                  @click="dialog.value = false"
                >
                  Logga in
                </v-btn>
              </v-card-actions>
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
  } from 'vuex'

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
      onClick (e, item) {
        e.stopPropagation()

        if (item.to || !item.href) return

        this.$vuetify.goTo(item.href.endsWith('!') ? 0 : item.href)
      },
    },
  }
</script>
