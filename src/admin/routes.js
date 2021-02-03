import Vue from 'vue';
import VueRouter from 'vue-router';
import PageAbout from "./pages/page-about.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: PageAbout,
  },
  {
    path: '*',
    component: {
      template: '<h1>404</h1>',
    },
  },
];

export default new VueRouter({
  base: '/admin/',
  mode: 'history',
  routes,
});
