import AppSkillAdd from './app-skill-add.vue';
import { action } from '@storybook/addon-actions';
import { text, withKnobs } from '@storybook/addon-knobs';

const methods = {
  onAddSkill: action('onAddSkill'),
};

export default {
  title: 'app-skill-add',
  components: { AppSkillAdd },
}

export const defaultView = () => ({
  components: { AppSkillAdd },
  template: `
  <app-skill-add
    @add-skill="onAddSkill"
  />
  `,
  methods
});
