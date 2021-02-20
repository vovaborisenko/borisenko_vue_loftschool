export default {
  namespaced: true,
  state: {
    data: [],
  },
  mutations: {
    ADD_REVIEW: (state, review) => {
      state.data = [ ...state.data, review ];
    },
    EDIT_REVIEW: (state, review) => {
      state.data = state.data.map(item => (item.id === review.id
        ? { ...review }
        : item));
    },
    DELETE_REVIEW: (state, id) => {
      state.data = state.data.filter(item => item.id !== id);
    },
    SET_REVIEWS: (state, reviews) => {
      state.data = reviews;
    },
  },
  actions: {
    // создает работу-проект
    async create({ commit }, formData) {
      try {
        const { data } = await this.$axios.post('/reviews', formData );

        commit('ADD_REVIEW', data);
      } catch (e) {
        throw new Error('Добавить отзыв не удалось');
      }
    },
    // изменяет проект
    async edit({ commit }, payload) {
      const { formData, id } = payload;
      try {
        const { data } = await this.$axios.post(`/reviews/${id}`, formData);

        commit('EDIT_REVIEW', data.review);
      } catch (e) {
        throw new Error('Сохранить изменения не удалось');
      }
    },
    // удаляет проект
    async delete({ commit }, id) {
      try {
        const { data } = await this.$axios.delete(`/reviews/${id}`);

        commit('DELETE_REVIEW', id);
      } catch (e) {
        throw new Error('Удалить отзыв не удалось');
      }
    },
    // получает все проекты
    async fetch({ commit, rootGetters }) {
      const userId = rootGetters['user/id'];

      try {
        const { data } = await this.$axios.get(`/reviews/${userId}`);

        commit('SET_REVIEWS', data);
      } catch (e) {
        throw new Error('Получить список отзывов не удалось');
      }
    },
  },
  getters: {
    reviews: (state) => state.data,
  },
}
