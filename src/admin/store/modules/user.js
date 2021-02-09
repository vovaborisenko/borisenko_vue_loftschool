export default {
  namespaced: true,
  state: {
    id: '',
  },
  mutations: {
    SET_ID: (state, id) => {
      state.id = id;
    },
  },
  actions: {
    async fetchId({ commit }) {
      try {
        const { data } = await this.$axios.get('/user');

        commit('SET_ID', data.user.id);
      } catch (e) {
        throw new Error(e.message);
      }
    },
  },
  getters: {
    id: state => state.id,
  }
};
