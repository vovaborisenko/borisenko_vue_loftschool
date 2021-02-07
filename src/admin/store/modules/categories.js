export default {
  namespaced: true,
  state: {
    data: [],
  },
  mutations: {
    ADD_CATEGORY: (state, category) => {
      state.data = [ { ...category, skills: [] }, ...state.data ];
    },
    EDIT_CATEGORY: (state, payload) => {
      state.data = state.data.map(item => {
        if (item.id === payload.id) {
          const { category } = payload;

          return { ...item, category };
        }

        return item;
      });
    },
    DELETE_CATEGORY: (state, id) => {
      state.data = state.data.filter(item => item.id !== id);
    },
    SET_CATEGORIES: (state, categories) => {
      state.data = categories.map(item => {
        return { skills: [], ...item }
      });
    },
    ADD_SKILL: (state, payload) => {
      state.data = state.data.map(item => {
        if (item.id === payload.category) {

          return { ...item, skills: [...item.skills, payload] };
        }

        return item;
      });
    },
    EDIT_SKILL: (state, newSkill) => {
      const editSkillInCategory = category => {
         category.skills = category.skills.map(item => {
           return item.id === newSkill.id ? newSkill : item;
         });
      }

      const findCategory = category => {
        if (category.id === newSkill.category) {
          editSkillInCategory(category);
        }

        return category;
      }

      state.data = state.data.map(findCategory);
    },
    DELETE_SKILL: (state, id) => {
      state.data = state.data.map(category => {
        category.skills = category.skills.filter(item => item.id !== id);

        return category;
      });
    },
  },
  actions: {
    // создает категории (группы) навыков
    async create({ commit }, title) {
      try {
        const { data } = await this.$axios.post('/categories', { title });

        commit('ADD_CATEGORY', data);
      } catch (e) {
        throw new Error('Создать группу не удалось');
      }
    },
    // изменяет заголовок категории
    async edit({ commit }, category) {
      const { id, title } = category;
      try {
        const { data } = await this.$axios.post(`/categories/${id}`, { title });

        commit('EDIT_CATEGORY', data.category);
      } catch (e) {
        throw new Error('Изменить имя группы не удалось');
      }
    },
    // удаляет категорию
    async delete({ commit }, id) {
      try {
        const { data } = await this.$axios.delete(`/categories/${id}`);

        commit('DELETE_CATEGORY', id);
      } catch (e) {
        throw new Error('Удалить группу навыков не удалось');
      }
    },
    // получает все категории со скилами
    async fetch({ commit }) {
      try {
        const { data } = await this.$axios.get(`/categories/431`);

        commit('SET_CATEGORIES', data);
      } catch (e) {
        throw new Error('Получить список навыков не удалось');
      }
    },
  },
  getters: {
    categories: (state) => state.data,
  },
}
