import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  state: {
    name: '',
    token: ''
  },
  mutations: {
    set_token (state, token) {
      state.token = token
      console.log('state.token:' + state.token)
    },
    del_token (state) {
      state.token = ''
      console.log('state.token:' + state.token)
    },
    set_name (state, name) {
      state.name = name
      console.log('state.name:' + state.name)
    },
    del_name (state) {
      state.name = ''
      console.log('state.name:' + state.name)
    }
  }
})
