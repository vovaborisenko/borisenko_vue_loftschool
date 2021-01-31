import AppUser from "./app-user.vue";
import { text, withKnobs } from "@storybook/addon-knobs";

export default {
  title: 'app-user',
  components: { AppUser },
  decorators: [withKnobs],
}

export const defaultView = () => ({
  components: { AppUser },
  props: {
    name: {
      default: text('name', 'Владимир Астаханов'),
    },
    size: {
      default: text('size', '3'),
    },
  },
  template: `
  <app-user
    :size="size"
    src="https://picsum.photos/300/300"
  >
    {{ name }}
  </app-user>`,
});
