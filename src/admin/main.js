import Vue from 'vue';
import router from './routes';
import App from './App.vue'

new Vue({
  el: "#app-root",
  router,
  render: h => h(App)
});
