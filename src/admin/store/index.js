import Vue from 'vue';
import Vuex from 'vuex';
import categories from './modules/categories';
import skills from './modules/skills';
import projects from './modules/projects';
import reviews from './modules/reviews';
import notification from './modules/notification';
import user from './modules/user';

Vue.use(Vuex);

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    categories,
    skills,
    projects,
    reviews,
    notification,
    user,
  },
});
