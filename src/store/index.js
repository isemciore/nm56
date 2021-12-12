import Vue from 'vue'
import Vuex from 'vuex'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'

Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    articles: require('@/data/articles.json'),
    nm56pictures: require('@/data/nm56bilder.json'),
    drawer: false,
    loggedIn: false,
    added_internal: false,
    user: null,
    items: [
      {
        text: 'Hem',
        href: '#/#!',
      },
      {
        text: 'Bilder',
        href: '#/pictures#!',
      },
      {
          text: 'Info',
        href: '#/info#!',
      },
    ],
  },
  getters: {
    categories: state => {
      const categories = []

      for (const article of state.articles) {
        if (
          !article.category ||
          categories.find(category => category.text === article.category)
        ) continue

        const text = article.category

        categories.push({
          text,
          href: '#!',
        })
      }

      return categories.sort().slice(0, 4)
    },
    user: (state, getters) => {
      return state.user
    },
    links: (state, getters) => {
      return state.items /* .concat(getters.categories) */
    },

    loggedIn: (state) => {
      return state.loggedIn
    },
  },
  mutations: {
    setDrawer: (state, payload) => (state.drawer = payload),
    toggleDrawer: state => (state.drawer = !state.drawer),
    LOGIN_USER (state, user) { /* actually useless does something in background */
      if (!state.added_internal) {
        state.items = state.items.concat({
          text: 'Internt',
          href: '#/internt#!',
        })
        state.added_internal = true
      }
      state.user = { ...user }
      state.loggedIn = user != null
    },
  },
  actions: {
    DUMMY_LOGIN ({ commit }, user) {
      commit('LOGIN_USER', user)
    },

    async firebaseLogin ({ commit }, authDetails) {
      const auth = getAuth()
      signInWithEmailAndPassword(auth, authDetails.email, authDetails.password)
        .then((userCredential) => {
          // Signed in
          console.log(userCredential)
          const user = userCredential.user
          commit('LOGIN_USER', user)
          // ...
        })
        .catch((error) => {
          console.warn(error.code)
          console.warn(error.message)
          // ..
        })
    },
  },
})

export default store
