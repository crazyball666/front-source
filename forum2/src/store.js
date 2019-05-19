import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userId: '',
    userName: '',
  },
  mutations: {
    login(state, user) {
      state.userId = user.id;
      state.userName = user.name;
    },
    logout(state) {
      state.userId = '';
      state.userName = '';
    }
  },
  actions: {

  }
})
