export default {
  namespaced: true,
  state: {
    data: {},
  },
  mutations: {
    SET_USER: (state, user) => state.data = user,
    CLEAR_USER: state => state.data = {},
  },
  actions: {
    async fetch({ commit }) {
      try {
        const { data } = await this.$axios.get('/user');

        commit('SET_USER', data.user);
      } catch (e) {
        throw new Error(e.message);
      }
    },
    login({ commit }, user) {
      commit('SET_USER', user);
    },
  },
  getters: {
    id: state => state.data.id,
    isUserLoggedIn: state => {
      const user = state.data;
      const userObjIsEmpty = Object.keys(user).length === 0 && user.constructor === Object;

      return userObjIsEmpty === false;
    },
  }
};
