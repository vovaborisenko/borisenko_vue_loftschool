<template lang="pug">
  view-admin-page
    view-content(title="Блок «Работы»")

      // page content
      app-project-form(
        v-if="newProject"
        @cancel="newProject = false"
      )

      h2.loading(v-if="loading") Загрузка...
      ul.projects(v-else)
        li.projects__item
          square-btn(
            type="square"
            title="Добавить работу"
            @click="newProject = true"
          )
        li.projects__item(
          v-for="project in projects"
          :key="project.id"
        )
</template>

<script>
import IconedBtn from 'components/button/types/iconedBtn/iconedBtn';
import AppCategory from 'components/app-category';
import ViewContent from './../views/view-content.vue';
import ViewAdminPage from './../views/view-admin-page.vue';
import { mapGetters, mapActions, mapMutations } from 'vuex';
import SquareBtn from 'components/button/types/squareBtn/squareBtn';
import AppProjectForm from 'components/app-project-form/app-project-form';

export default {
  name: 'page-about',
  components: {
    AppProjectForm,
    SquareBtn,
    ViewAdminPage,
    ViewContent,
    AppCategory,
    IconedBtn,
  },
  data() {
    return {
      loading: false,
      newProject: false,
    };
  },
  computed: {
    ...mapGetters({
      projects: 'projects/projects',
    }),
  },
  methods: {
    ...mapActions({
      createProjectAction: 'projects/create',
      editProjectAction: 'projects/edit',
      deleteProjectAction: 'projects/delete',
      fetchProjectsAction: 'projects/fetch',
      showNotification: 'notification/show',
    }),
    async createProject(project) {
      project.blocked = true;

      try {
        await this.createProjectAction(project);

        this.showNotification({type: 'success', text: 'Работа добавлена'});
        this.newProject = false;
      } catch (e) {
        this.showNotification({type: 'error', text: e.message});
      } finally {
        project.blocked = false;
      }
    },
    async saveCategory(project, projectId) {
      project.blocked = true;

      try {
        await this.editProjectAction({
          id: projectId,
          ...project,
        });

        this.showNotification({type: 'success', text: 'Работа изменена'});
        project.editMode = false;
      } catch (e) {
        this.showNotification({type: 'error', text: e.message});
      } finally {
        project.blocked = false;
      }
    },
    async deleteCategory(project, id) {
      if (confirm(`Вы уверены, что хотите удалить работу: "${project.title}"?`)) {
        project.deleting = true;

        try {
          await this.deleteProjectAction(id);

          this.showNotification({type: 'success', text: 'Группа удалена'});
        } catch (e) {
          this.showNotification({type: 'error', text: e.message});
        } finally {
          project.deleting = false;
        }
      }
    },
  },
  async created() {
    this.loading = true;

    try {
      await this.fetchProjectsAction();
    } catch (e) {
      this.showNotification({type: 'error', text: e.message});
    } finally {
      this.loading = false;
    }
  },
}
</script>

<style lang="postcss">
.projects {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 25px;
  margin-top: 25px;
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
