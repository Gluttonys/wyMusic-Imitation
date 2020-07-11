import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 用户id
    uid: "",
    // 用户名
    uname: ""
  },
  getters: {},
  mutations: {
    setUid(state, id) {
      state.uid = id
    },
    setUname(state, name) {
      state.uname = name
    }
  },
  actions: {},
  modules: {}
})

