import Vue from 'vue';
import './styles/index.scss';
import App from './App.vue';
import router from './router';
import store from './store';
import './permission';
import './core';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
