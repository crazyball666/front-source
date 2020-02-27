import Vue from "vue"
import Vuex from "vuex"
import mutations from "./mutation"

Vue.use(Vuex)

let store = new Vuex.Store({
  state: {
    userId: null,
    account: null,
    name: null,
    roles: null,
  },
  mutations,
})

export default store