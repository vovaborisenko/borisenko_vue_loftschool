import Vue from 'vue';
import SimpleVueValidator from 'simple-vue-validator';
import router from './router';
import store from './store';
import $axios from './requests';
import App from './App.vue';

Vue.use(SimpleVueValidator, {mode: 'conservative'});

store.$axios = $axios;

new Vue({
  el: "#app-root",
  router,
  store,
  render: h => h(App)
});
