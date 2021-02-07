import Notification from './notification.vue';
import { action } from '@storybook/addon-actions';

export default {
  title: 'Компоненты/notification',
  component: Notification,
  excludeStories: /.*Data$/,
  argTypes: {
    type: {
      control: {
        type: 'select',
        options: ['success', 'warning', 'error'],
      },
    },
  },
};

export const actionsData = {
  onClick: action('onClick'),
};

const Template = (args, { argTypes }) => ({
  components: { Notification },
  props: Object.keys(argTypes),
  methods: actionsData,
  template: `<notification
    v-bind="$props"
    @click="onClick"
  />`,
});

export const Default = Template.bind({});
Default.args = {
  text: 'Notification message',
  type: 'success',
};

export const Warning = Template.bind({});
Warning.args = {
  ...Default.args,
  type: 'warning',
};

export const Error = Template.bind({});
Error.args = {
  ...Default.args,
  type: 'error',
};
