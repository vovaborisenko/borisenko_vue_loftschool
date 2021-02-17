export default {
  namespaced: true,
  state: {
    data: [],
  },
  mutations: {
    ADD_PROJECT: (state, project) => {
      state.data = [ ...state.data, project ];
    },
    EDIT_PROJECT: (state, project) => {
      state.data = state.data.map(item => (item.id === project.id
        ? { ...project }
        : item));
    },
    DELETE_PROJECT: (state, id) => {
      state.data = state.data.filter(item => item.id !== id);
    },
    SET_PROJECTS: (state, projects) => {
      state.data = projects;
    },
  },
  actions: {
    // создает работу-проект
    async create({ commit }, formData) {
      try {
        const { data } = await this.$axios.post('/works', formData );

        commit('ADD_PROJECT', data);
      } catch (e) {
        throw new Error('Добавить работу не удалось');
      }
    },
    // изменяет проект
    async edit({ commit }, payload) {
      const { formData, id } = payload;
      try {
        const { data } = await this.$axios.post(`/works/${id}`, formData);

        commit('EDIT_PROJECT', data.work);
      } catch (e) {
        throw new Error('Сохранить изменения не удалось');
      }
    },
    // удаляет проект
    async delete({ commit }, id) {
      try {
        const { data } = await this.$axios.delete(`/works/${id}`);

        commit('DELETE_PROJECT', id);
      } catch (e) {
        throw new Error('Удалить работу не удалось');
      }
    },
    // получает все проекты
    async fetch({ commit, rootGetters }) {
      const userId = rootGetters['user/id'];

      try {
        const { data } = await this.$axios.get(`/works/${userId}`);

        commit('SET_PROJECTS', data);
      } catch (e) {
        throw new Error('Получить список работ не удалось');
      }
    },
  },
  getters: {
    projects: (state) => state.data,
  },
}
