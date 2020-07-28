import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 全局引入字体图标样式
import './assets/font/iconfont.css'
// 全局导入 font-awesome
import './assets/plugin/font-awesome-4.7.0/css/font-awesome.min.css'

// 引入并全局注册element UI
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
