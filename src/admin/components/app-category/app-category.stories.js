import AppCategory from './app-category.vue';
import * as AppSkillStories from 'components/app-skill/app-skill.stories';
import { action } from '@storybook/addon-actions';

export default {
  title: 'Компоненты навыков/app-category',
  component: AppCategory,
  excludeStories: /.*Data$/,
};

export const actionsData = {
  onSave: action('save'),
  onDelete: action('delete'),
  onAddSkill: action('add-skill'),
  onDeleteSkill: action('delete-skill'),
  onSaveSkill: action('save-skill'),
};

const Template = (args, { argTypes }) => ({
  components: { AppCategory },
  props: Object.keys(argTypes),
  methods: actionsData,
  template: `<app-category
    v-bind="$props"
    @delete="onDelete"
    @save="onSave"
    @add-skill="onAddSkill"
    @delete-skill="onDeleteSkill"
    @save-skill="onSaveSkill"
  />`,
});

export const Default = Template.bind({});
Default.args = {
  title: 'Category Name Default View',
  empty: false,
  skills: [
    { ...AppSkillStories.Default.args, id: 1, title: 'Skill 1', percent: '45' },
    { ...AppSkillStories.Default.args, id: 2, title: 'Skill 2', percent: '54' },
    { ...AppSkillStories.Default.args, id: 3, title: 'Skill 3', percent: '97' },
  ],
};

export const NewCategory = Template.bind({});
NewCategory.args = {
  ...Default.args,
  title: '',
  empty: true,
  skills: [],
};
