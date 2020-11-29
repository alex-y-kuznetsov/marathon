import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import users from '@/data/users.json'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    addedUsers: users.users
  },
  mutations: {
    addUser (state, addedUser) {
      state.addedUsers.unshift(addedUser)
      addedUser.new = true
    }
  },
  actions: {
  },
  modules: {
  },
  getters: {
    getMyState: state => state.addedUsers
  },
  plugins: [createPersistedState()]
})
