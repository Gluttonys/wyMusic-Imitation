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
    tabBar: ["tuijian", "playlist", "diantai", "paihangbang", "songer", "zuixin"],
    // 记录当前路由列表
    routers: [],
    // 一个指向当前路由的索引值
    routerIndex: 0
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

