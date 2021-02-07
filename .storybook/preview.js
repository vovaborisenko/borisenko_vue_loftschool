import Vue from 'vue';
import SimpleVueValidator from 'simple-vue-validator';
import "./main.pcss";

Vue.use(SimpleVueValidator, {mode: 'conservative'});

export const parameters = {
  backgrounds: {
    values: [
      { name: 'white', value: '#ffffff', default: true },
      { name: 'grey', value: '#8395a7' },
    ],
  },
  actions: { argTypesRegex: '^on[A-Z].*' },
};
