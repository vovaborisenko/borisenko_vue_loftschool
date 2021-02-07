import AppSkillAdd from './app-skill-add.vue';
import { action } from '@storybook/addon-actions';

export default {
  title: 'Компоненты навыков/app-skill-add',
  component: AppSkillAdd,
  excludeStories: /.*Data$/,
};

export const actionsData = {
  onAdd: action('add'),
};

const Template = (args, { argTypes }) => ({
  components: { AppSkillAdd },
  props: Object.keys(argTypes),
  methods: actionsData,
  template: `<app-skill-add
    v-bind="$props"
    @add="onAdd"
  />`,
});

export const Default = Template.bind({});
Default.args = {
};
