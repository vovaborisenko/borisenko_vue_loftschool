import AppTagsInput from './app-tags-input.vue';

export default {
  title: 'app-tags-input',
  components: { AppTagsInput },
};

export const defaultView = () => ({
  components: { AppTagsInput },
  data() {
    return {
      tags: "One, two, three, four",
    };
  },
  template: `
    <div>
      <pre>{{tags}}</pre>
      <app-tags-input
        v-model="tags"
      />
    </div>
  `,
});
