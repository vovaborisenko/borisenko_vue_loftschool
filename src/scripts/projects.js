import Vue from 'vue';
import axios from 'axios';
import config from './../../env.paths.json';

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
        imageURL: this.currentProject?.imageURL,
        id: this.currentProject?.id,
        isFirst: this.currentIndex === 0,
        isLast: this.currentIndex === this.projects.length - 1,
      };
    },
    previews() {
      return this.projects.length
        ? this.projects
            .map((item) => ({
              imageURL: item.imageURL,
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
    async getProjects() {

      try {
        const { data } = await axios.get(`${config.BASE_URL}/works/431`);

        this.projects = data.map((item) => {
          const imageURL = `${config.BASE_URL}/${item.photo}`;
          const tags = item.techs.split(',');

          return {
            ...item,
            imageURL,
            tags
          };
        });
      } catch (e) {
        const projects = require('./../data/projects.json');

        this.projects = projects.map((item) => {
          const imageURL = require(`images/content/${item.photo}`).default;
          const tags = item.techs.split(',');

          return {
            ...item,
            imageURL,
            tags
          };
        });
      }
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
    this.getProjects();
  }
});
