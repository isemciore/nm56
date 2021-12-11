import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    articles: require('@/data/articles.json'),
    nm56pictures: require('@/data/nm56bilder.json'),
    drawer: false,
    loggedIn: false,
    items: [
      {
        text: 'Hem',
        href: '#/',
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
    links: (state, getters) => {
      return state.items /*.concat(getters.categories) */
    },

    loggedIn: (state, getters) => {
      return state.loggedIn
    },
  },
  mutations: {
    setDrawer: (state, payload) => (state.drawer = payload),
    toggleDrawer: state => (state.drawer = !state.drawer),
  },
  actions: {

  },
})
