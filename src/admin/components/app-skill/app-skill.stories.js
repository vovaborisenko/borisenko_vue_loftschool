import AppSkill from './app-skill.vue';
import { action } from '@storybook/addon-actions';
import { text, withKnobs } from '@storybook/addon-knobs';

const methods = {
  onDelete: action('onDelete'),
  onApply: action('onApply'),
};

export default {
  title: 'app-skill',
  components: { AppSkill },
}

export const defaultView = () => ({
  components: { AppSkill },
  template: `
  <app-skill
    title="Javascript"
    percent="89"
    @delete-skill="onDelete"
    @apply-skill="onApply"
  />
  `,
  methods
});
