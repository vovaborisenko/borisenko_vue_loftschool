import AppTagsInput from './app-tags-input.vue';

export default {
  title: 'Компоненты/app-tags-input',
  components: { AppTagsInput },
};

const Template = (args, {argTypes}) => ({
  components: { AppTagsInput },
  props: Object.keys(argTypes),
  template: `<app-tags-input v-bind="$props"/>`,
});

export const Default = Template.bind({});
Default.args = {
  tags: 'One, two, three, four',
};

export const WithLabel = Template.bind({});
WithLabel.args = {
  ...Default.args,
  title: 'Label input',
}

export const WithError = Template.bind({});
WithError.args = {
  ...Default.args,
  errorMessage: 'Error message',
}
