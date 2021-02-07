import AppSkill from './app-skill.vue';
import { action } from '@storybook/addon-actions';

export default {
  title: 'Компоненты навыков/app-skill',
  component: AppSkill,
  excludeStories: /.*Data$/,
};

export const actionsData = {
  onSave: action('save'),
  onDelete: action('delete'),
};

const Template = (args, { argTypes }) => ({
  components: { AppSkill },
  props: Object.keys(argTypes),
  methods: actionsData,
  template: `<app-skill
    v-bind="$props"
    @delete="onDelete"
    @save="onSave"
  />`,
});

export const Default = Template.bind({});
Default.args = {
  title: 'Skill Name',
  percent: '87',
};


