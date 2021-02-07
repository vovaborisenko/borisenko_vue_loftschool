import AppUser from "./app-user.vue";

export default {
  title: 'Компоненты/app-user',
  components: { AppUser },
}

const Template = (args, { argTypes }) => ({
  components: { AppUser },
  props: Object.keys(argTypes),
  template: `<app-user v-bind="$props" >Владимир Астаханов</app-user>`,
});

export const Default = Template.bind({});
Default.args = {
  size: '3',
  src: 'https://picsum.photos/300/300',
};
