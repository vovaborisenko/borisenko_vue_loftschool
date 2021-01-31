import headline from "./headline";
import { text, withKnobs } from "@storybook/addon-knobs";

export default {
  title: 'headline',
  components: { headline },
  decorators: [withKnobs],
}

export const defaultView = () => ({
  components: { headline },
  props: {
    title: {
      default: text('title', 'Панель администрирования'),
    },
  },
  template: `
  <headline
    :title="title"
  >
    <h4>Slot content</h4>
  </headline>`,
});
