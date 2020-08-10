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
    // 记录当前路由列表
    routers: [],
    // 一个指向当前路由的索引值
    routerIndex: 0,
    // 当前播放列表 Array<number> [123323,1232321, ...]
    musicIdList: []
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
    },
    UpdateMusicIdList(state, musicIdList) {
      /**
       * state :  store 状态
       * musicIdList : Array<number> : 存放当前音乐列表的 id
       * 修改原有列表
       * */
      state.musicIdList = musicIdList
    },
    pushMusicIdList(state, musicIdList) {
      /**
       * 将 id list 追加到当前播放列表中去
       * 判同 ： 如果音乐列表的前 5 项目都相同
       * 则这个音乐列表已经被存在于播放列表中了
       * */
      let isSame = musicIdList.slice(0, 5).every(id => state.musicIdList.includes(id))
      state.musicIdList = isSame ? state.musicIdList : [...state.musicIdList, ...musicIdList]
    },
    addMusicIdList(state, id) {
      /**
       * 每次往播放列表中添加一个歌曲
       * */
      state.musicIdList.push(id)
    }

  },
  actions: {},
  modules: {}
})

