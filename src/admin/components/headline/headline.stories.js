import Headline from "./headline";

export default {
  title: 'Компоненты/headline',
  components: { Headline },
}

const Template = (args, { argTypes }) => ({
  components: { Headline },
  props: Object.keys(argTypes),
  template: `<headline
    v-bind="$props"
  >
    <h4>Slot content</h4>
  </headline>`,
});

export const Default = Template.bind({});
Default.args = {
  title: 'Панель администрирования',
};
