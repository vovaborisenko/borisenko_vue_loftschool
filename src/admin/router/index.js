import Vue from 'vue';
import VueRouter from 'vue-router';
import axios from 'axios';
import store from './../store';
import config from './../../../env.paths.json';

Vue.use(VueRouter);

const PageAbout = () => import("../pages/page-about.vue");
const PageLogin = () => import("../pages/page-login.vue");
const PageProjects = () => import("../pages/page-projects.vue");
const PageReviews = () => import("../pages/page-reviews.vue");

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
    component: PageReviews,
  },
  {
    path: '/login',
    component: PageLogin,
    meta: {
      public: true,
    }
  },
  {
    path: '*',
    component: {
      template: '<h1>404</h1>',
    },
  },
];

const router = new VueRouter({
  base: '/admin/',
  // mode: 'history',
  routes,
});

const guard = axios.create({
  baseURL: config.BASE_URL,
});

router.beforeEach(async (to, from, next) => {
  const isPublicRoute = to.matched.some(item => item.meta.public);
  const isUserLoggedIn = store.getters['user/isUserLoggedIn'];

  if (isPublicRoute === false && isUserLoggedIn === false) {
    const token = localStorage.getItem('token');

    guard.defaults.headers['Authorization'] = `Bearer ${token}`;

    try {
      const { data } = await guard.get('/user');

      await store.dispatch('user/login', data.user);
      next();
    } catch (e) {
      await router.replace('/login');
      localStorage.removeItem('token');
    }
  } else {
    next();
  }
});

export default router;
