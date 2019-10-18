import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import BaiduMap from 'vue-baidu-map'
/* 这个地方是vuex 的 store库*/
import store from './store/store';
Vue.use(ElementUI);
Vue.use(BaiduMap,{
  ak : '40ecxAlmNxANwUMDVdfs1pGMVLBVZ83T'
});
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
