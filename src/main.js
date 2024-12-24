import Vue from 'vue';
import App from './App.vue';
import router from './router'; // 正確引入 router
import './assets/css/styles.css'; // 引入全局樣式

Vue.config.productionTip = false;

new Vue({
  router, // 確保 router 正確掛載
  render: h => h(App),
}).$mount('#app');

