import AppCategoryName from './app-category-name.vue';
import { action } from '@storybook/addon-actions';

export default {
  title: 'Компоненты навыков/app-category-name',
  component: AppCategoryName,
  excludeStories: /.*Data$/,
};

export const actionsData = {
  onSave: action('save'),
  onDelete: action('delete'),
};

const Template = (args, { argTypes }) => ({
  components: { AppCategoryName },
  props: Object.keys(argTypes),
  methods: actionsData,
  template: `<app-category-name
    v-bind="$props"
    @delete="onDelete"
    @save="onSave"
  />`,
});

export const Default = Template.bind({});
Default.args = {
  title: 'Skill Name',
  editModeByDefault: false,
  blocked: false,
};

export const Blocked = Template.bind({});
Blocked.args = {
  ...Default.args,
  blocked: true,
};

export const EditModeByDefault = Template.bind({});
EditModeByDefault.args = {
  ...Default.args,
  title: '',
  editModeByDefault: true,
};
