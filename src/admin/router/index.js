import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const PageAbout = () => import("../pages/page-about.vue");
const PageLogin = () => import("../pages/page-login.vue");
const PageProjects = () => import("../pages/page-projects.vue");

const routes = [
  {
    path: '/',
    name: 'about',
    component: PageAbout,
  },
  {
    path: '/projects',
    name: 'projects',
    component: PageProjects,
  },
  {
    path: '/reviews',
    name: 'reviews',
    component: PageAbout,
  },
  {
    path: '/login',
    component: PageLogin,
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
  // mode: 'history',
  routes,
});
