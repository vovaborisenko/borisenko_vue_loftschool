import AppCategory from './app-category.vue';
import {text, withKnobs} from '@storybook/addon-knobs';

export default {
  title: 'app-category',
  components: { AppCategory },
  decorators: [withKnobs],
}

export const defaultView = () => ({
  components: { AppCategory },
  template: `<app-category
    title="Category Name"
  />`
});

export const emptyView = () => ({
  components: { AppCategory },
  template: `<app-category
    empty
  />`
});
