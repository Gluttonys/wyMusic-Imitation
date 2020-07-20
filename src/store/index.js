import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 用户id
    uid: "",
    // 用户名
    uname: "",
    // 当前tabbar
    currentTab: "tuijian",
    // tabBar 列表
    tabBar: ["tuijian", "playlist", "diantai", "paihangbang", "songer", "zuixin"]
  },
  getters: {},
  mutations: {
    setUid(state, id) {
      state.uid = id
    },
    setUname(state, name) {
      state.uname = name
    },
    setCurrentTab(state, newTab) {
      state.currentTab = newTab
    }
  },
  actions: {},
  modules: {}
})

