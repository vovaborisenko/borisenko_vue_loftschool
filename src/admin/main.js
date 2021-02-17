import Vue from 'vue';
import SimpleVueValidator from 'simple-vue-validator';
import router from './router';
import store from './store';
import $axios from './requests';
import App from './App.vue';
import config from './../../env.paths.json';

Vue.use(SimpleVueValidator, {mode: 'conservative'});

store.$axios = $axios;

new Vue({
  el: "#app-root",
  data: {
    baseURL: config.BASE_URL,
  },
  router,
  store,
  render: h => h(App)
});
