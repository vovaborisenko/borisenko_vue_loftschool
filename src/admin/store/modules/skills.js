export default {
  namespaced: true,
  mutations: {},
  actions: {
    async add({ commit }, skill) {
      try {
        const { data } = await this.$axios.post('/skills', skill);

        commit('categories/ADD_SKILL', data, { root: true });
      } catch (e) {
        throw new Error('Добавить навык не удалось');
      }
    },
    async edit({ commit }, editingSkill) {
      const { id, skill } = editingSkill;

      try {
        const { data } = await this.$axios.post(`/skills/${id}`, skill);

        commit('categories/EDIT_SKILL', data.skill, { root: true });
      } catch (e) {
        throw new Error('Изменить навык не удалось');
      }
    },
    async delete({ commit }, id) {
      try {
        const { data } = await this.$axios.delete(`/skills/${id}`);

        commit('categories/DELETE_SKILL', id, { root: true });
      } catch (e) {
        throw new Error('Удалить навык не удалось');
      }
    },
  },
};
