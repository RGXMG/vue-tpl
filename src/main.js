import Vue from 'vue';
import App from './App.vue';
import router from './router';
import { mockXHR } from '../mock';
import store from './store';
import './core';

Vue.config.productionTip = false;
mockXHR();

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
