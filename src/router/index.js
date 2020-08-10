import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [
  {
    // 首页
    name: 'Index',
    path: '/',
    component: () => import('../views/index/index')
  },

  {
    // 歌单页面
    name: 'songList',
    path: '/songList/:song_list_id',
    component: () => import('../views/songListPage/songList/songList'),
    // 在组件中使用 $route 会使之与其对应路由形成高度耦合，
    // 从而使组件只能在某些特定的 URL 上使用，限制了其灵活性。
    // 使用 props 将组件和路由解耦：
    // 如果 props 被设置为 true，route.params 将会被设置为组件属性。
    props: true,
    meta: {
      keepAlive: false // 不需要缓存
    }
  },

  {
    // MV 播放页面
    name: 'MVPlayer',
    path: '/MvPlayer/:mv_id',
    props: true,
    component: () => import('../views/MvPlayer/MvPlayer')
  },

  {
    // 歌曲页面， 就是点击左下角的音乐块
    name: 'music',
    path: '/music/:music_id',
    props: true,
    component: () => import('../views/music/music')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// 路由守卫
router.beforeEach((to, _, next) => {
  next()
})

router.afterEach((to, from) => {
})


export default router
