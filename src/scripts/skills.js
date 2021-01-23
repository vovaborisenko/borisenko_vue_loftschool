import Vue from 'vue';

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
  created() {
    this.skillsGroups = require('./../data/skills.json');
  }
});
