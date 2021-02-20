<template lang="pug">
  view-admin-page
    view-content(title="Блок «Работы»")

      // page content
      app-project-form(
        v-if="showForm"
        :project="editedProject"
        :saving="projectSaving"
        @cancel="closeForm"
        @save="applyProject"
      )

      h2.loading(v-if="loading") Загрузка...
      ul.projects(v-else)
        li.projects__item
          square-btn(
            type="square"
            title="Добавить работу"
            @click="onNewProject"
          )
        li.projects__item(
          v-for="project in projects"
          :key="project.id"
        )
          app-project(
            :title="project.title"
            :description="project.description"
            :link="project.link"
            :tags="project.techs"
            :photo="project.photo"
            :blocked="project.id === editedProject.id"
            @delete="onDelete(project)"
            @edit="onEdit(project)"
          )
</template>

<script>
import IconedBtn from 'components/button/types/iconedBtn/iconedBtn';
import ViewContent from './../views/view-content.vue';
import ViewAdminPage from './../views/view-admin-page.vue';
import { mapGetters, mapActions } from 'vuex';
import SquareBtn from 'components/button/types/squareBtn/squareBtn';
import AppProjectForm from 'components/app-project-form/app-project-form';
import AppProject from "components/app-project/app-project";

const defaultProject = {
  id: 0,
  title: '',
  link: '',
  description: '',
  photo: null,
  techs: '',
};

export default {
  name: 'page-projects',
  components: {
    AppProject,
    AppProjectForm,
    SquareBtn,
    ViewAdminPage,
    ViewContent,
    IconedBtn,
  },
  data() {
    return {
      loading: false,
      showForm: false,
      projectSaving: false,
      editedProject: defaultProject,
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
    closeForm() {
      this.showForm = false;
      this.editedProject = defaultProject;
    },
    async applyProject(project) {
      const formData = new FormData();

      for (let key of Object.keys(project)) {
        formData.append(key, project[key]);
      }

      this.projectSaving = true;

      try {
        if (project.id) {
          await this.editProjectAction({ formData, id: project.id });
          this.showNotification({type: 'success', text: 'Работа изменена'});
        } else {
          await this.createProjectAction(formData);
          this.showNotification({type: 'success', text: 'Работа добавлена'});
        }
        this.showForm = false;
      } catch (e) {
        this.showNotification({type: 'error', text: e.message});
      } finally {
        this.projectSaving = false;
        this.editedProject = defaultProject;
      }
    },
    async onDelete(project) {
      if (confirm(`Вы уверены, что хотите удалить работу: "${project.title}"?`)) {
        this.editedProject = project;

        try {
          await this.deleteProjectAction(project.id);
          this.showNotification({type: 'success', text: 'Работа удалена'});
        } catch (e) {
          this.showNotification({type: 'error', text: e.message});
        } finally {
          this.editedProject = defaultProject;
        }
      }
    },
    onEdit(project) {
      if (!this.showForm) {
        this.editedProject = project;
        this.showForm = true;
      } else {
        const text = this.editedProject.id ? 'Завершите редактирование работы' : 'Завершите создание работы';
        this.showNotification({type: 'warning', text});
      }
    },
    onNewProject() {
      if (!this.showForm) {
        this.editedProject = defaultProject;
        this.showForm = true;
      } else {
        const text = this.editedProject.id ? 'Завершите редактирование работы' : 'Завершите создание работы';
        this.showNotification({type: 'warning', text});
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
@import "./../../styles/mixins.pcss";

.projects {
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 10px;
  margin-top: 25px;

  @include tablets {
    grid-template-columns: 1fr 1fr;
    grid-gap: 25px;
  }

  @include desktop {
    grid-template-columns: 1fr 1fr 1fr;
  }
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
