import Vue from 'vue';
import './styles/index.scss';
import App from './App.vue';
import router from './router';
import store from './store';
import './permission';
import './core';

Vue.config.productionTip = false;

console.log('store.state.app', store.state.app);
new Vue({
  router,
  store,
  created() {
    // 设置App widget大小
    this.$ELEMENT.size = store.state.app.size;
  },
  render: h => h(App),
}).$mount('#app');
