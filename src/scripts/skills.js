import Vue from 'vue';
import axios from 'axios';
import config from './../../env.paths.json';

const SkillsListItem = {
  props: ['title', 'percent'],
  template: '#skill-item',
  methods: {
    calcStrokeDashoffset() {
      const strokeDasharray = parseInt(getComputedStyle(this.$refs['colored-circle']).strokeDasharray);

      return strokeDasharray * (100 - this.percent)/100;
    },
  },
  mounted() {
    this.$refs['colored-circle'].style.strokeDashoffset = this.calcStrokeDashoffset() ;
  }
};

const SkillsList = {
  props: ['title', 'skills'],
  template: '#skills-category',
  components: { SkillsListItem },
};

new Vue({
  el: '#skills-list',
  template: '#skills-widget',
  components: { SkillsList },
  data: () => ({
    skillsGroups: [],
  }),
  async created() {
    try {
      const { data } = await axios.get(`${config.BASE_URL}/categories/431`);

      this.skillsGroups = data;
    } catch (e) {
      this.skillsGroups = require('./../data/skills.json');
    }
  }
});
