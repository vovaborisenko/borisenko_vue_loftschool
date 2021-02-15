export default {
  namespaced: true,
  state: {
    data: [],
  },
  mutations: {
    ADD_PROJECT: (state, category) => {
      state.data = [ { ...category, skills: [] }, ...state.data ];
    },
    EDIT_PROJECT: (state, payload) => {
      state.data = state.data.map(item => {
        if (item.id === payload.id) {
          const { category } = payload;

          return { ...item, category };
        }

        return item;
      });
    },
    DELETE_PROJECT: (state, id) => {
      state.data = state.data.filter(item => item.id !== id);
    },
    SET_PROJECTS: (state, categories) => {
      state.data = categories.map(item => {
        return { skills: [], ...item }
      });
    },
  },
  actions: {
    // создает работу-проект
    async create({ commit }, project) {
      try {
        const { data } = await this.$axios.post('/works', project );

        commit('ADD_PROJECT', data);
      } catch (e) {
        throw new Error('Добавить работу не удалось');
      }
    },
    // изменяет проект
    async edit({ commit }, project) {
      const { id } = project;
      try {
        const { data } = await this.$axios.post(`/works/${id}`, project);

        commit('EDIT_PROJECT', data.project);
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
      const userId = rootGetters["user/id"];

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
