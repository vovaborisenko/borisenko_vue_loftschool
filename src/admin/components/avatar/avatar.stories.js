import Avatar from "./avatar.vue";

export default {
  title: 'Компоненты/avatar',
  components: { Avatar },
}

const Template = (args, { argTypes }) => ({
  components: { Avatar },
  props: Object.keys(argTypes),
  template: `<avatar v-bind="$props" />`,
});

export const Default = Template.bind({});
Default.args = {
  size: '3.1',
  src: 'https://picsum.photos/300/300',
};
