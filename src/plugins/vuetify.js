import Vue from 'vue'
import Vuetify from 'vuetify/lib'

Vue.use(Vuetify)

export default new Vuetify({
  breakpoint: {
    mobileBreakpoint: 'xs', // This is equivalent to a value of 960
  },
  theme: {
    themes: {
      light: {
        primary: '#CBAA5C',
        secondary: '#083759',
      },
    },
  },
})
