<template lang="pug">
  view-admin-page
    view-content(title="Блок «Обо мне»")
      template(v-slot:header)
        iconed-btn(
          v-show="!newCategory"
          type="iconed"
          title="Добавить группу"
          @click="newCategory = true"
        )

      // page content
      template(v-if="!newCategory")
        h2.loading(v-if="loading"
        ) Загрузка...
        h2.loading(v-else-if="!categories.length"
        ) Чтобы добавить навык нажмите на кнопку "Добавить группу"

      ul.categories
        li.categories__item(v-if="newCategory")
          app-category(
            empty
            @save="createCategory"
            @cancel="newCategory = false"
          )
        li.categories__item(
          v-for="category in categories"
          :key="category.id"
        )
          app-category(
            :title="category.category"
            :skills="category.skills"
            @delete="deleteCategory($event, category.id)"
            @save="saveCategory($event, category.id)"
            @add-skill="addSkill($event, category.id)"
            @delete-skill="deleteSkill($event, category.id)"
            @save-skill="saveSkill($event, category.id )"
          )
</template>

<script>
import IconedBtn from 'components/button/types/iconedBtn/iconedBtn';
import AppCategory from 'components/app-category';
import ViewContent from './../views/view-content.vue';
import ViewAdminPage from './../views/view-admin-page.vue';
import { mapGetters, mapActions, mapMutations } from 'vuex';

export default {
  name: 'page-about',
  components: {
    ViewAdminPage,
    ViewContent,
    AppCategory,
    IconedBtn,
  },
  data() {
    return {
      loading: false,
      newCategory: false,
    };
  },
  computed: {
    ...mapGetters({
      categories: 'categories/categories',
    }),
  },
  methods: {
    ...mapActions({
      createCategoryAction: 'categories/create',
      editCategoriseAction: 'categories/edit',
      deleteCategoriseAction: 'categories/delete',
      fetchCategoriesAction: 'categories/fetch',
      createSkillAction: 'skills/add',
      editSkillAction: 'skills/edit',
      deleteSkillAction: 'skills/delete',
      showNotification: 'notification/show',
    }),
    async createCategory(category) {
      category.blocked = true;

      try {
        await this.createCategoryAction(category.title);

        this.showNotification({type: 'success', text: 'Группа добавлена'});
        this.newCategory = false;
      } catch (e) {
        this.showNotification({type: 'error', text: e.message});
      } finally {
        category.blocked = false;
      }
    },
    async saveCategory(category, categoryId) {
      category.blocked = true;

      try {
        await this.editCategoriseAction({
          id: categoryId,
          title: category.title,
        });

        this.showNotification({type: 'success', text: 'Группа изменена'});
        category.editMode = false;
      } catch (e) {
        this.showNotification({type: 'error', text: e.message});
      } finally {
        category.blocked = false;
      }
    },
    async deleteCategory(category, id) {
      if (confirm(`Вы уверены, что хотите удалить группу навыков: "${category.title}"?`)) {
        category.deleting = true;

        try {
          await this.deleteCategoriseAction(id);

          this.showNotification({type: 'success', text: 'Группа удалена'});
        } catch (e) {
          this.showNotification({type: 'error', text: e.message});
        } finally {
          category.deleting = false;
        }
      }
    },
    async addSkill(addingSkill, categoryId) {
      const newSkill = {
        title: addingSkill.skill.title,
        percent: addingSkill.skill.percent,
        category: categoryId,
      }

      addingSkill.skill.blocked = true;
      try {
        await this.createSkillAction(newSkill);

        this.showNotification({type: 'success', text: 'Навык добавлен'});

        // очищает поля ввода добавления скила
        addingSkill.validation.reset();
        addingSkill.skill.title = '';
        addingSkill.skill.percent = '0';
      } catch (e) {
        this.showNotification({type: 'error', text: e.message});
      } finally {
        addingSkill.skill.blocked = false;
      }
    },
    async saveSkill(editingSkill, categoryId) {
      const skill = {
        id: editingSkill.id,
        skill: {
          title: editingSkill.skill.title,
          percent: editingSkill.skill.percent,
          category: categoryId,
        },
      };

      editingSkill.skill.blocked = true;

      try {
        await this.editSkillAction(skill);

        this.showNotification({type: 'success', text: 'Навык изменен'});
        editingSkill.skill.editMode = false;
      } catch (e) {
        this.showNotification({type: 'error', text: e.message});
      } finally {
        editingSkill.skill.blocked = false;
      }
    },
    async deleteSkill(deletingSkill) {
      const { id } = deletingSkill;

      if (confirm(`Вы уверены, что хотите удалить навык: "${deletingSkill.skill.title}"?`)) {
        deletingSkill.skill.blocked = true;

        try {
          await this.deleteSkillAction(id);

          this.showNotification({type: 'success', text: 'Навык удален'});
        } catch (e) {
          this.showNotification({type: 'error', text: e.message});
        } finally {
          deletingSkill.skill.blocked = false;
        }
      }
    },
  },
  async created() {
    this.loading = true;

    try {
      await this.fetchCategoriesAction();
    } catch (e) {
      this.showNotification({type: 'error', text: e.message});
    } finally {
      this.loading = false;
    }
  },
}
</script>

<style lang="postcss">
.categories {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 25px;
}

.loading {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50vmin;
  padding: 40px;
  text-align: center;
  opacity: 0.7;
}
</style>
