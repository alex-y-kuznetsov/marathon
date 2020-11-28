import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    addedUsers: []
  },
  mutations: {
    addUser (state, addedUser) {
      state.addedUsers.push(addedUser)
    }
  },
  actions: {
  },
  modules: {
  }
})
