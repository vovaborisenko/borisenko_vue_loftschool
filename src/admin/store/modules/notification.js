let counter = 1;

export default {
  namespaced: true,
  state: {
    data: [],
  },
  mutations: {
    ADD_NOTIFICATION: (state, notification) => {
      state.data = [notification, ...state.data];
    },
    REMOVE_NOTIFICATION: (state, id) => {
      state.data = state.data.filter(item => item.id !== id);
    }
  },
  actions: {
    show({ commit, dispatch }, notification) {
      let timer = null;
      let id = counter++;

      commit('ADD_NOTIFICATION', {
        id,
        isShow: true,
        ...notification
      });

      if (timer) {
        clearTimeout(titmer);
      }

      timer = setTimeout(() => {
        commit('REMOVE_NOTIFICATION', id);
      }, 6000);
    },
    hide({ commit }, id) {
      commit('REMOVE_NOTIFICATION', id);
    },
  },
  getters: {
    notifications: state => state.data,
  }
};
