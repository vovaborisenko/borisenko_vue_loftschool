import Vue from 'vue';

const ProjectDesc = {
  props: ['title', 'description', 'link', 'tags'],
  template: '#project-desc',
}

const ProjectsSlider = {
  props: ['previews', 'activeSlide', 'activeNumber'],
  template: '#projects-slider',
}

new Vue({
  el: '#projects-block',
  template: '#projects-widget',
  components: { ProjectDesc, ProjectsSlider },
  data: () => ({
    projects: [],
    currentIndex: 0,
  }),
  computed: {
    activeNumber() {
      return this.currentIndex + 1;
    },
    activeSlide() {
      return {
        imagePath: this.currentProject?.imagePath,
        id: this.currentProject?.id,
        isFirst: this.currentIndex === 0,
        isLast: this.currentIndex === this.projects.length - 1,
      };
    },
    previews() {
      return this.projects.length
        ? this.projects
            .map((item) => ({
              previewPath: item.previewPath,
              id: item.id,
            }))
            .filter((item, index, array) => {
              if (this.currentIndex < 2) {
                return index < 4;
              } else if (this.currentIndex > array.length - 4) {
                return index > array.length - 5;
              } else {
                return index > this.currentIndex - 2 && index < this.currentIndex + 3;
              }
            })
        : [];
    },
    currentProject() {
      return this.projects.length
        ? this.projects[this.currentIndex]
        : {};
    }
  },
  methods: {
    getProjects() {
      const projects = require('./../data/projects.json');

      return projects.map((item) => {
        const imagePath = require(`images/content/${item.image}`).default;
        const previewPath = require(`images/content/${item.preview}`).default;

        return {
          ...item,
          imagePath,
          previewPath,
        };
      });
    },
    nextSlide() {
      this.currentIndex++;
    },
    prevSlide() {
      this.currentIndex--;
    },
    chooseSlide(payload) {
      this.currentIndex = this.projects.findIndex((item) => item.id === payload);
    },
  },
  created() {
    this.projects = this.getProjects();
  }
});
